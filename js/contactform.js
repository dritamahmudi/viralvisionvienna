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
            
            const nameValue = form.elements["name"].value;
           logError(5,"nameValue = ",nameValue);
    
            if (!loading || !errorDiv || !successDiv) {
                  logError(9,"Fehler: Einige Feedback-Elemente fehlen im HTML!");
                return;
            }

            // Reset Zustand
            errorDiv.textContent = "";
            errorDiv.style.display = "none";

            successDiv.textContent = "";
            successDiv.style.display = "none";
        
            button.disabled = true;
            loading.style.display = "block";
    
          const formDataTest = new FormData(form);
          logError(8,"formDataTest = ",JSON.stringify(Object.fromEntries(formDataTest)));
    
            try {
                const formData = new FormData(form);
                const response = await fetch("https://misty-water-4a11.viralvision.workers.dev", {
                    method: "POST",
                    body: JSON.stringify(Object.fromEntries(formData)),
          
               });
               
                const result = await response.json();
                logError(6,"index.html response.text() = ",response);
                logError(7,"index.html result.text() = ",result);
                
                if (result.success) {
                    successDiv.textContent = "Nachricht erfolgreich gesendet!";
                    successDiv.style.display = "block";
                    loading.style.display = "none";
                    form.reset();
                    const nameValue = form.elements["name"].value;   // ""
                    const emailValue = form.elements["email"].value; // ""
                    const textValue = form.elements["text"].value;
                } else {
                    errorDiv.textContent = "Fehler Unbekannter Fehler";
                    errorDiv.style.display = "block";
                    loading.style.display = "none";
                }
            }
             catch (error) {
                    logError(40, "Netzwerkfehler – bitte versuche es später erneut.", error);
                    errorDiv.textContent = "Netzwerkfehler – bitte versuche es später erneut.";
                    errorDiv.style.display = "block";
                    loading.style.display = "none";
               } finally {
                button.disabled = false;
                if (loading) loading.style.display = "none"; // Sicherheitsprüfung
            }
        });
