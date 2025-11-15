document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
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

    // Send to Google Sheet
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbx61fetM4-0iRJDJy8t3BO_jYg_Esa5HZQQ6gi7CWFBmZVrlN4uUC8uV0NsHp7NLSLx/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, albumType, message })
        }
      );
    } catch (err) {
      alert("Server error — Try again later.");
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

    // Prepare Email but DON'T auto-open (popup block hoga)
    window.bookingEmailLink = `mailto:rg4116551@gmail.com?subject=${encodeURIComponent(
      "New Album Booking Request"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAlbum Type: ${albumType}\nMessage: ${message}`
    )}`;

    // Show success popup
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

    // Inject email link into popup if needed
    const emailBtn = popup.querySelector(".btn-email");
    if (emailBtn) {
      emailBtn.href = window.bookingEmailLink;
    }

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
