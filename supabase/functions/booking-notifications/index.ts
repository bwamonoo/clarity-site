import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { patientName, patientPhone, serviceName, appointmentDate, appointmentTime } = payload;

    // Get secrets
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const hubtelClientId = Deno.env.get("HUBTEL_CLIENT_ID");
    const hubtelClientSecret = Deno.env.get("HUBTEL_CLIENT_SECRET");
    const hubtelSenderId = Deno.env.get("HUBTEL_SENDER_ID");

    // Clinic info (defaults or from env)
    const clinicEmail = Deno.env.get("CLINIC_EMAIL");
    const clinicPhone = Deno.env.get("CLINIC_PHONE_NUMBER");

    const messageBody = `New Appointment Alert!
Patient: ${patientName} (${patientPhone || 'No phone'})
Service: ${serviceName}
Date/Time: ${appointmentDate} at ${appointmentTime}`;

    console.log("Preparing to send notifications...", { body: messageBody });

    const promises = [];

    // --- 1. Send Email via Resend ---
    if (resendApiKey && clinicEmail) {
      const emailPromise = fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // If using free tier, you must send from onboarding@resend.dev
          from: "onboarding@resend.dev",
          to: [clinicEmail],
          subject: "New Appointment Booked",
          text: messageBody,
        }),
      }).then(res => res.json())
        .then(data => console.log("Resend response:", data))
        .catch(err => console.error("Resend error:", err));

      promises.push(emailPromise);
    } else {
      console.warn("Skipping Email: Missing RESEND_API_KEY or CLINIC_EMAIL");
    }

    // --- 2. Send SMS via Hubtel ---
    if (hubtelClientId && hubtelClientSecret && hubtelSenderId && clinicPhone) {
      const hubtelUrl = `https://smsc.hubtel.com/v1/messages/send?clientid=${encodeURIComponent(hubtelClientId)}&clientsecret=${encodeURIComponent(hubtelClientSecret)}&from=${encodeURIComponent(hubtelSenderId)}&to=${encodeURIComponent(clinicPhone)}&content=${encodeURIComponent(messageBody)}`;

      const hubtelPromise = fetch(hubtelUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then(res => res.json())
        .then(data => console.log("Hubtel response:", data))
        .catch(err => console.error("Hubtel error:", err));

      promises.push(hubtelPromise);
    } else {
      console.warn("Skipping SMS: Missing Hubtel credentials or CLINIC_PHONE_NUMBER");
    }

    // Wait for both to finish
    await Promise.allSettled(promises);

    return new Response(JSON.stringify({ success: true, message: "Notifications processed." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
