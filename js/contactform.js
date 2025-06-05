// The code processes data from an HTML form, converts it into a suitable format, and sends it to a Cloudflare Worker (serverless function) for further processing.
// A helper function for logging errors with line numbers
function logError(line) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.error.apply(console, ["[" + line + "]:"].concat(args));
}
// Event listener for the form; catches the submission of the form with ID contactForm and prevents default behavior (page reload).
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    // Interrupts the normal submit process
            e.preventDefault();
    
    // Variable initialization
            const form = e.target;
            const button = form.querySelector("button[type='submit']");
            
            // Important: Check if the elements exist!
            const loading = document.getElementById("loading");
            const errorDiv = document.getElementById("error");
            const successDiv = document.getElementById("success");
            
            const nameValue = form.elements["name"].value;
           logError(5,"nameValue = ",nameValue);
    
            if (!loading || !errorDiv || !successDiv) {
                  logError(9,"Error: Some feedback elements are missing in HTML!");
                return;
            }

            // Reset state
            errorDiv.textContent = "";
            errorDiv.style.display = "none";

            successDiv.textContent = "";
            successDiv.style.display = "none";
       // Disables the submit button and shows loading indicator to prevent multiple clicks
            button.disabled = true;
            loading.style.display = "block";

    // Prepare form data, creates a FormData object from the form
          const formDataTest = new FormData(form);
          logError(8,"formDataTest = ",JSON.stringify(Object.fromEntries(formDataTest)));
    
            try {
                // FormData is converted to a simple object (Object.fromEntries). The object is sent to server as JSON string.
        
                const formData = new FormData(form);
                const response = await fetch("https://contactform.viralvision.workers.dev", {
                    method: "POST",
                    body: JSON.stringify(Object.fromEntries(formData)),
          
               });
               // Process server response
                const result = await response.json();
                logError(6,"index.html response.text() = ",response);
                logError(7,"index.html result.text() = ",result);
                
                if (result.success) {
                    successDiv.textContent = "Message sent successfully!";
                    successDiv.style.display = "block";
                    loading.style.display = "none";
                    form.reset();
                    const nameValue = form.elements["name"].value;   // ""
                    const emailValue = form.elements["email"].value; // ""
                    const textValue = form.elements["text"].value;
                } else {
                    errorDiv.textContent = "Error: Unknown error";
                    errorDiv.style.display = "block";
                    loading.style.display = "none";
                }
            }
                // Error handling
             catch (error) {
                    logError(40, "Network error - please try again later.", error);
                    errorDiv.textContent = "Network error - please try again later.";
                    errorDiv.style.display = "block";
                    loading.style.display = "none";
               } finally {
                 // Ensures the submit button is re-enabled and loading indicator is hidden - regardless of success or failure
                button.disabled = false;
                if (loading) loading.style.display = "none"; // Safety check
            }
        });
