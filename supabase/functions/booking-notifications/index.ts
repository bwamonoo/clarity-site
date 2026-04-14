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
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioSenderNumber = Deno.env.get("TWILIO_SENDER_NUMBER");

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

    // --- 2. Send SMS via Twilio ---
    if (twilioAccountSid && twilioAuthToken && twilioSenderNumber && clinicPhone) {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
      const params = new URLSearchParams();
      params.append('To', clinicPhone);
      params.append('From', twilioSenderNumber);
      params.append('Body', messageBody);

      const twilioPromise = fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      }).then(res => res.json())
        .then(data => console.log("Twilio response:", data))
        .catch(err => console.error("Twilio error:", err));

      promises.push(twilioPromise);
    } else {
      console.warn("Skipping SMS: Missing Twilio credentials or CLINIC_PHONE_NUMBER");
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
