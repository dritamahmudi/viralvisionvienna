document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  };

  const response = await fetch("https://misty-water-4a11.viralvision.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const text = await response.text();
  alert(text);
});
