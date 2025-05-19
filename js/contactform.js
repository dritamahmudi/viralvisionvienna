document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert das Standard-Absenden

    // Hier dein eigenes Skript/Logik:
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    // Beispiel: Daten in der Konsole ausgeben
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // Hier kannst du z.B. einen AJAX-Request machen oder die Daten an einen Service schicken

    // Optional: Erfolgsmeldung anzeigen
    alert("Danke für deine Nachricht!");
  });
});
