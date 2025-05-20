function logError(line) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.error.apply(console, ["[" + line + "]:"].concat(args));
}
document.getElementById("contactForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const button = form.querySelector("button[type='submit']");
            
            // Wichtig: Prüfe, ob die Elemente existieren!
            const loading = document.getElementById("loading");
            const errorDiv = document.getElementById("error");
            const successDiv = document.getElementById("success");

            if (!loading || !errorDiv || !successDiv) {
                console.error("Fehler: Einige Feedback-Elemente fehlen im HTML!");
                return;
            }

            // Reset Zustand
            errorDiv.textContent = "";
            successDiv.textContent = "";
            button.disabled = true;
            loading.style.display = "block";

            try {
                const formData = new FormData(form);
                const response = await fetch("https://misty-water-4a11.viralvision.workers.dev", {
                    method: "POST",
                    body: JSON.stringify(Object.fromEntries(formData)),
                    headers: { "Content-Type": "application/json" },
                });
               
                const result = await response.json();
                console.log("index.html response.text() = ",response.text());
                console.log("index.html result.text() = ",result.text());
              
                if (result.success) {
                    successDiv.textContent = "Nachricht erfolgreich gesendet!";
                    form.reset();
                } else {
                    errorDiv.textContent = "Fehler Unbekannter Fehler"};
                }
             catch (error) {
                    logError(40, "Netzwerkfehler – bitte versuche es später erneut.", error);
                    errorDiv.textContent = "Netzwerkfehler – bitte versuche es später erneut.";
                    logError(40, "Fetch-Fehler:", error);
               } finally {
                button.disabled = false;
                if (loading) loading.style.display = "none"; // Sicherheitsprüfung
            }
        });
