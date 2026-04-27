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
    const arkeselApiKey = Deno.env.get("ARKESEL_API_KEY");
    const arkeselSenderId = Deno.env.get("ARKESEL_SENDER_ID");

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

    // --- 2. Send SMS via Arkesel ---
    if (arkeselApiKey && arkeselSenderId && clinicPhone) {
      const arkeselPromise = fetch("https://sms.arkesel.com/api/v2/sms/send", {
        method: 'POST',
        headers: {
          'api-key': arkeselApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: arkeselSenderId,
          message: messageBody,
          recipients: [clinicPhone]
        })
      }).then(res => res.json())
        .then(data => console.log("Arkesel response:", data))
        .catch(err => console.error("Arkesel error:", err));

      promises.push(arkeselPromise);
    } else {
      console.warn("Skipping SMS: Missing Arkesel credentials or CLINIC_PHONE_NUMBER");
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
