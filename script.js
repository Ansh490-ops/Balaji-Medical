const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_xG8dNq_4uAuspzlTdSb9rxCw6eYhXHgSz-l6GzPsPl9fouzH1jZz0BhwuyRq9fud/exec";
const WHATSAPP_NUMBER = "918004353261"; // apna WhatsApp number

document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const notes = document.getElementById('notes').value.trim();
  const email = document.getElementById('email').value.trim();
  const fileInput = document.getElementById('prescription');

  if (!name || !phone || !service) {
    alert("Please fill all required fields.");
    return;
  }

  const sendBtn = document.getElementById('sendBtn');
  sendBtn.disabled = true;
  sendBtn.textContent = "Detecting location... ⏳";

  let lat = "", lng = "", address = "";

  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
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

  sendBtn.disabled = false;
  sendBtn.textContent = "Submit";

  // ✅ Convert uploaded file (if any) to Base64 for sending
  let fileBase64 = "";
  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    fileBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const payload = {
    name,
    phone,
    email,
    service,
    notes,
    lat,
    lng,
    address,
    file: fileBase64,
    submittedAt: new Date().toISOString(),
  };

  // ✅ Send to Google Sheets
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

  // ✅ WhatsApp confirmation
  const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : address || "Location not provided";
  const text = `Hello, I am ${name}.
Phone: ${phone}
Email: ${email || "Not provided"}
Service: ${service}
Notes: ${notes}
Location: ${mapLink}`;

  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
