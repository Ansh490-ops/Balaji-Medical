const APPS_SCRIPT_URL = "YOUR_WEB_APP_URL"; // Apps Script Web App URL
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // apna WhatsApp number

document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const notes = document.getElementById('notes').value.trim();

  let lat="", lng="", address="";
  if(navigator.geolocation){
    try{
      const pos = await new Promise((res, rej)=> navigator.geolocation.getCurrentPosition(res, rej, {timeout:10000}));
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch(e){
      address = prompt("Location denied. Please enter your address:");
    }
  } else {
    address = prompt("Geolocation not supported. Please enter your address:");
  }

  const payload = {name, phone, service, notes, lat, lng, address, submittedAt: new Date().toISOString()};

  // Send data to Google Sheet
  await fetch(APPS_SCRIPT_URL,{
    method:'POST',
    mode:'no-cors',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });

  // WhatsApp confirmation
  const mapLink = (lat && lng)? `https://www.google.com/maps?q=${lat},${lng}` : address;
  const text = `Hello, I am ${name}.\nPhone: ${phone}\nService: ${service}\nNotes: ${notes}\nLocation: ${mapLink}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
};
