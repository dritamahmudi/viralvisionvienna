// Der Code verarbeitet Daten aus einem HTML-Formular, wandelt sie in ein geeignetes Format um und sendet sie an einen Cloudflare Worker (Serverless-Funktion) zur weiteren Verarbeitung.
// Eine Hilfsfunktion zum Loggen von Fehlern mit Zeilennummern
function logError(line) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.error.apply(console, ["[" + line + "]:"].concat(args));
}
//Event-Listener für das Formular; Faengt das Absenden des Formulars mit der ID contactForm ab und verhindert das Standardverhalten (Seitenneuladung).
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    // Unterbricht den normalen Submit-Prozess
            e.preventDefault();
    
    //Variableninitialisierung
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
       // Deaktiviert den Submit-Button und zeigt die Ladeanzeige an, um Mehrfachklicks zu verhindern
            button.disabled = true;
            loading.style.display = "block";

    //Formulardaten vorbereiten,Erstellt ein FormData-Objekt aus dem Formular
          const formDataTest = new FormData(form);
          logError(8,"formDataTest = ",JSON.stringify(Object.fromEntries(formDataTest)));
    
            try {
                // FormData wird in ein einfaches Objekt umgewandelt (Object.fromEntries). Das Objekt wird als JSON-String an den Server gesendet.
        
                const formData = new FormData(form);
                const response = await fetch("https://contactform.viralvision.workers.dev", {
                    method: "POST",
                    body: JSON.stringify(Object.fromEntries(formData)),
          
               });
               //Verarbeitung der Server-Antwort
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
                //Fehlerbehandlung
             catch (error) {
                    logError(40, "Netzwerkfehler – bitte versuche es später erneut.", error);
                    errorDiv.textContent = "Netzwerkfehler – bitte versuche es später erneut.";
                    errorDiv.style.display = "block";
                    loading.style.display = "none";
               } finally {
                 //Stellt sicher, dass der Submit-Button wieder aktiviert und die Ladeanzeige ausgeblendet wird – unabhängig vom Erfolg oder Fehler.
                button.disabled = false;
                if (loading) loading.style.display = "none"; // Sicherheitsprüfung
            }
        });
