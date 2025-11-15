document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const albumType = document.getElementById("albumType").value.trim();
    const message = document.getElementById("message").value.trim();

    // Required validation
    if (!name || !email || !phone || !albumType) {
      alert("Please fill all required fields.");
      return;
    }

    // WhatsApp Message
    const whatsappNumber = "919118602187";
    const whatsappMessage = encodeURIComponent(
      `📸 *New Album Booking Request!*\n\n` +
      `👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n💽 Album Type: ${albumType}\n💬 Message: ${message || "N/A"}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");

    // Email link (optional)
    window.location.href = `mailto:rg4116551@gmail.com?subject=${encodeURIComponent(
      "New Album Booking Request"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAlbum Type: ${albumType}\nMessage: ${message}`
    )}`;

    // Show your success popup
    showSuccessPopup();

    // Reset form
    form.reset();
  });
});

function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  if (popup) {
    popup.style.display = "flex";
    popup.style.opacity = "1";
    setTimeout(() => closeSuccessPopup(), 5000);
  }
}

function closeSuccessPopup() {
  const popup = document.getElementById("successPopup");
  if (popup) {
    popup.style.opacity = "0";
    setTimeout(() => (popup.style.display = "none"), 300);
  }
}
