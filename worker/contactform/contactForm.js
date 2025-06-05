//testcommit
export default {
  async fetch(request) {
    // CORS headers (adjust as needed)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Content-Type": "application/json",
      "Authorization": "Bearer re_EU8tCFmv_Q2VzkTW1usHinNuLNahdvmA8",
    };
    // Handle OPTIONS (Preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  
    try {
      // Parse incoming JSON from the client
      const requestData = await request.json();
      console.log("Incoming Request Data:", JSON.stringify(requestData, null, 2)); // Pretty-print JSON

      // Validate required fields
      const { name, email, text, subject } = requestData;
      if (!name || !email || !text || !subject) {
        throw new Error("Worker.js Missing required fields (name, email, text, subject)");
      }

      // Prepare JSON payload for Resend
      const resendPayload = {
        "to": email,
        "subject": subject,
        "name": name,
        "from":"viralvision@viralvisionvienna.com",
        "cc":"viralvision@viralvisionvienna.com",
        "text": `Name: ${name}\nEmail/From: ${email}\nSubject: ${subject}\n\nMessage/Text: ${text}`,
      };

      // Log the payload before sending to Resend
      console.log("Resend Payload:", JSON.stringify(resendPayload, null, 2));

      // Send to Resend API
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Authorization Bearer re_EU8tCFmv_Q2VzkTW1usHinNuLNahdvmA8",
        },
        body: JSON.stringify(resendPayload),
      });

      // Log Resend's response (success/error)
      const resendResult = await resendResponse.json();
      console.log("Resend API Response:", JSON.stringify(resendResult, null, 2));

      // Handle Resend errors
      if (!resendResponse.ok) {
        throw new Error(resendResult.message || "Failed to send via Resend");
      }

      // Success response to client
      return new Response(
        JSON.stringify({ success: true, message: "Email sent!" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } catch (error) {
      // Log the error
      console.error("Worker Error:", error.message);
  
      
      // Error response to client
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  },
};
