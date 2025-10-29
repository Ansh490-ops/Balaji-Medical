const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyaGl6vC7i8c1eI1qs_fYtzp6iBJizRFnqU4tC9JOEzQvjxPwYV414MciWMuKurAu73/exec";
const WHATSAPP_NUMBER = "919277405966"; // WhatsApp number without '+'

document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const notes = document.getElementById('notes').value.trim();

  if (!name || !phone || !service) {
    alert("Please fill all required fields (Name, Phone, and Service).");
    return;
  }

  let lat = "", lng = "", address = "";
  try {
    if (navigator.geolocation) {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } else {
      address = prompt("Geolocation not supported. Please enter your address:");
    }
  } catch (e) {
    console.error("Error fetching location:", e);
    address = prompt("Couldn't fetch location. Please enter your address:");
  }

  const payload = {
    name,
    phone,
    service,
    notes,
    lat,
    lng,
    address,
    submittedAt: new Date().toISOString()
  };

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("✅ Data sent to Google Sheet");
      alert("Your request has been successfully submitted!");
    } else {
      console.error("❌ Failed to send data to sheet. Response:", response);
      alert("There was an issue submitting your request. Please try again.");
    }
  } catch (err) {
    console.error("❌ Error sending to sheet:", err);
    alert("An error occurred while submitting your request. Please check your network and try again.");
  }

  const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : address;
  const text = `🩺 New Medical Request:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💊 Service: ${service}\n📝 Notes: ${notes}\n📍 Location: ${mapLink}`;
  
  setTimeout(() => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }, 500);
};
