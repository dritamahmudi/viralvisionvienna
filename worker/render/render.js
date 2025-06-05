//worker cloudflare-render
export default {
  async fetch(request, env) {
    // Nur POST-Anfragen erlauben (für deinen Chatbot)
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const RENDER_URL = "https://viralvisionvienna-chatbot.onrender.com";
    try {
      // Anfrage an Render weiterleiten
      const response = await fetch(RENDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(await request.json()),
      });
      return response;
    } catch (error) {
      return new Response(JSON.stringify({ error: "Backend error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
