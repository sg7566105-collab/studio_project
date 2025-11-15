document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const albumType = document.getElementById("albumType").value.trim();
    const message = document.getElementById("message").value.trim();

    // WHATSAPP
    const whatsappNumber = "919118602187";
    const whatsappMessage = encodeURIComponent(
      `📸 *New Album Booking Request!* \n\n` +
      `👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n💽 Album Type: ${albumType}\n💬 Message: ${message || "N/A"}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");

    // EMAIL via Web3Forms
    const formData = new FormData(form);
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("Album Type", albumType);
    formData.append("Message", message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      showSuccessPopup();
      form.reset();
    } else {
      alert("Email failed. Try again.");
    }
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
