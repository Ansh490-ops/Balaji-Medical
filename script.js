// ✅ Tumhara Apps Script deployment URL (ek hi URL se dono kaam honge)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHS8C85g1gGsWssFSO65YPFsllRZe0QvM8eRkmr3aj2EzDbXM95QLZKnKk2MO8l1EK/exec";
const DRIVE_UPLOAD_URL = APPS_SCRIPT_URL; // same URL
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

  // ✅ Location detection
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

  // ✅ Upload Prescription (if selected)
  let fileUrl = "";
  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    const fileData = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const formData = new FormData();
    formData.append("fileName", file.name);
    formData.append("fileData", fileData);
    formData.append("action", "uploadPrescription");

    try {
      const res = await fetch(DRIVE_UPLOAD_URL, { method: "POST", body: formData });
      const text = await res.text();
      console.log("Upload response:", text);
      if (text.includes("Success")) {
        fileUrl = text.split("Success:")[1]?.trim() || "✅ Uploaded successfully";
      } else {
        fileUrl = "❌ File upload failed.";
      }
    } catch (err) {
      fileUrl = "⚠️ Error uploading file.";
      console.error(err);
    }
  }

  sendBtn.disabled = false;
  sendBtn.textContent = "Submit";

  // ✅ Prepare payload for Google Sheet
  const payload = {
    name,
    phone,
    email,
    service,
    notes,
    lat,
    lng,
    address,
    fileUrl,
    submittedAt: new Date().toISOString(),
  };

  // ✅ Send data to Google Sheet
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

  // ✅ WhatsApp confirmation message
  const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : address || "Location not provided";
  const text = `Hello, I am ${name}.
Phone: ${phone}
Email: ${email || "Not provided"}
Service: ${service}
Notes: ${notes}
Location: ${mapLink}
File: ${fileUrl}`;

  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
