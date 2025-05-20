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
                    errorDiv.textContent = Fehler: ${result.error || "Unbekannter Fehler"};
                }
            } catch (error) {
                errorDiv.textContent = "Netzwerkfehler – bitte versuche es später erneut.";
                console.error("Fetch-Fehler:", error);
            } finally {
                button.disabled = false;
                if (loading) loading.style.display = "none"; // Sicherheitsprüfung
            }
        });
