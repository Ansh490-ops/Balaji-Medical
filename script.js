const APPS_SCRIPT_URL ="https://script.google.com/macros/s/AKfycbyrksPu3t8xSr7xwfWzTOtEfN0aDsVehTENa7Zhx5mF6pJTT96wZYfN_0frtkA5ae_T/exec";
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

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => console.log("✅ Data sent to Google Sheet"))
  .catch(err => console.error("❌ Error sending to sheet:", err));

  const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : address;
  const text = `🩺 New Medical Request:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💊 Service: ${service}\n📝 Notes: ${notes}\n📍 Location: ${mapLink}`;
  
  setTimeout(() => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }, 500);
};
