<script>
function logError(line) {
  var args = Array.prototype.slice.call(arguments, 1);
  console.error.apply(console, ["[" + line + "]:"].concat(args));
}

// === Email validation helper ===
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// === Real-time email validation ===
document.getElementById("email")?.addEventListener("input", function() {
    const emailValue = this.value;
    const errorDiv = document.getElementById("error");
    const button = document.querySelector("#contactForm button[type='submit']");
    
    if (!emailValue) {
        errorDiv.style.display = "none";
        button.disabled = false;
        return;
    }
    
    if (!validateEmail(emailValue)) {
        errorDiv.textContent = "Please enter a valid email address";
        errorDiv.style.display = "block";
        button.disabled = true;
    } else {
        errorDiv.style.display = "none";
        button.disabled = false;
    }
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const button = form.querySelector("button[type='submit']");

    // Important: Check if elements exist!
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const successDiv = document.getElementById("success");

  const nameValue = form.elements["name"].value;
  const emailValue = form.elements["email"].value;
  logError(5, "nameValue = ", nameValue);
  logError(5.1, "emailValue = ", emailValue);

  // === Email validation ===
  if (!validateEmail(emailValue)) {
    errorDiv.textContent = "Please enter a valid email address.";
    errorDiv.style.display = "block";
    return;
  }

  if (!loading || !errorDiv || !successDiv) {
    logError(9, "Error: Some feedback elements are missing in the HTML!");
    return;
  }

    // Reset state
  errorDiv.textContent = "";
  errorDiv.style.display = "none";

  successDiv.textContent = "";
  successDiv.style.display = "none";

    // Email validation
  if (!validateEmail(emailValue)) {
      errorDiv.textContent = "Please enter a valid email address";
      errorDiv.style.display = "block";
      return;
  }
    
  button.disabled = true;
  loading.style.display = "block";

  const formDataTest = new FormData(form);
  logError(8, "formDataTest = ", JSON.stringify(Object.fromEntries(formDataTest)));

  try {
    const formData = new FormData(form);
    const response = await fetch("https://misty-water-4a11.viralvision.workers.dev", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const result = await response.json();
    logError(6, "index.html response.text() = ", response);
    logError(7, "index.html result.text() = ", result);

    if (result.success) {
      successDiv.textContent = "Message sent successfully!";
      successDiv.style.display = "block";
      loading.style.display = "none";
      form.reset();
      
      const nameValue = form.elements["name"].value;   // ""
      const emailValue = form.elements["email"].value; // ""
      const textValue = form.elements["text"].value;
    } else {
      errorDiv.textContent = "Error: Unknown error occurred.";
      errorDiv.style.display = "block";
      loading.style.display = "none";
    }
  } catch (error) {
    logError(40, "Network error – please try again later.", error);
    errorDiv.textContent = "Network error – please try again later.";
    errorDiv.style.display = "block";
    loading.style.display = "none";
  } finally {
    button.disabled = false;
    if (loading) loading.style.display = "none";
  }
});
</script>
