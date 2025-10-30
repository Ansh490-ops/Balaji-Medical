const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwb3_EIjKqmHrj9VwkGD_KAYC9SuJx8lWfZCN2ryJ1ENQbsiZNFEw8n7VEau4Obyv1G/exec"; // Apps Script Web App URL
const WHATSAPP_NUMBER = "918004353261"; // apna WhatsApp number

document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const notes = document.getElementById('notes').value.trim();

  if (!name || !phone || !service) {
    alert("Please fill all required fields.");
    return;
  }

  // Show loading message
  const sendBtn = document.getElementById('sendBtn');
  sendBtn.disabled = true;
  sendBtn.textContent = "Detecting location... ⏳";

  let lat = "", lng = "", address = "";

  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds max wait
          maximumAge: 0
        })
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch (err) {
      console.warn("Location error:", err);
      if (err.code === 1) {
        alert("❌ Location access denied. Please type your address manually.");
      } else if (err.code === 3) {
        alert("⌛ Location request timed out. Please try again or enter address manually.");
      } else {
        alert("⚠️ Location unavailable. Please enter your address manually.");
      }
      address = prompt("Enter your address:");
    }
  } else {
    address = prompt("Geolocation not supported. Please enter your address:");
  }

  // Restore button text
  sendBtn.disabled = false;
  sendBtn.textContent = "Submit";

  const payload = {
    name,
    phone,
    service,
    notes,
    lat,
    lng,
    address,
    submittedAt: new Date().toISOString(),
  };

  // Send to Google Sheets
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Error sending to Google Sheet:", err);
  }

  // WhatsApp confirmation link
  const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : address || "Location not provided";
  const text = `Hello, I am ${name}.\nPhone: ${phone}\nService: ${service}\nNotes: ${notes}\nLocation: ${mapLink}`;

  // WhatsApp open (same tab - faster & popup safe)
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
