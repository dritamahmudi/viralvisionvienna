function logError(line) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.error.apply(console, ["[" + line + "]:"].concat(args));
}

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("Du", message, "user");
  userInput.value = "";

    //Mit fetch wird die Nachricht als POST-Request an deinen Server (z.B. https://viralvisionvienna-chatbot.onrender.com) geschickt.
  try {
      console.debug(" chatBox: ", chatBox.textContent);
      console.debug("message", message);
    const response = await fetch("https://viralvisionvienna-chatbot.onrender.com", {
//      const response = await fetch("https://stunning-space-meme-w5q5vp79pg9cg9g5-10000.app.github.dev/", {
  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    });
      console.debug("Response-Objekt:",  response);

    const data = await response.json();
     console.debug("data:", data);

      console.debug("Status:", response.status);
    console.debug("OK?", response.ok);
    console.debug("Headers:", response.headers);
      
    appendMessage("Chat-OT", data.HelloPost, "bot");
  } catch (error) {
    appendMessage("Fehler", "Es gab ein Problem mit der Verbindung.", "bot");
    console.error(error);
     logError(30,"Error:  ",error);
  }
}

function appendMessage(sender, message, type) {
  const p = document.createElement("p");
  p.innerHTML = `<strong class="${type}">${sender}:</strong> ${message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}
