<script>
// Debugging Helper
function debug(logMessage, data = null) {
  console.log(`[DEBUG] ${logMessage}`, data || '');
  return true;
}

// Improved Email Validation
function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = re.test(String(email).toLowerCase());
  debug(`Email validation for "${email}":`, isValid);
  return isValid;
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
  debug('DOM fully loaded');
  
  const form = document.getElementById('contactForm');
  if (!form) {
    debug('ERROR: Form with ID "contactForm" not found!');
    return;
  }

  const emailField = document.getElementById('email');
  const submitBtn = form.querySelector('button[type="submit"]');
  const errorDiv = document.getElementById('error');
  const successDiv = document.getElementById('success');
  const loadingDiv = document.getElementById('loading');

  // Real-time Validation
  emailField?.addEventListener('input', function() {
    debug('Email input changed:', this.value);
    updateFormState();
  });

  // Update Form State
  function updateFormState() {
    const email = emailField.value;
    const isValid = isValidEmail(email);
    
    if (submitBtn) submitBtn.disabled = !isValid;
    if (errorDiv) {
      errorDiv.style.display = isValid ? 'none' : 'block';
      errorDiv.textContent = isValid ? '' : 'Please enter a valid email address';
    }
    
    debug('Form state updated', {
      email: email,
      isValid: isValid,
      submitDisabled: submitBtn?.disabled
    });
  }

  // Form Submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    debug('Form submission started');
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    debug('Form data prepared:', data);

    // Reset State
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    if (loadingDiv) loadingDiv.style.display = 'block';
    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch('https://misty-water-4a11.viralvision.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      debug('Server response:', result);

      if (result.success) {
        if (successDiv) {
          successDiv.textContent = 'Message sent successfully!';
          successDiv.style.display = 'block';
        }
        form.reset();
      } else {
        if (errorDiv) {
          errorDiv.textContent = result.message || 'An error occurred';
          errorDiv.style.display = 'block';
        }
      }
    } catch (error) {
      debug('Network error:', error);
      if (errorDiv) {
        errorDiv.textContent = 'Network error - please try again later';
        errorDiv.style.display = 'block';
      }
    } finally {
      if (loadingDiv) loadingDiv.style.display = 'none';
      if (submitBtn) submitBtn.disabled = false;
      debug('Form submission completed');
    }
  });

  // Initial State Setup
  updateFormState();
  debug('Form initialization complete');
});
</script>
