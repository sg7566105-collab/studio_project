
const text1 = "Crafting";
const text2 = "Memories";

let i = 0, j = 0;

function typeLine1() {
  const line1 = document.querySelector(".line1");
  const icon = document.querySelector(".icon");
  if (!line1 || !icon) return;

  line1.textContent = text1.slice(0, i++);
  if (i <= text1.length) setTimeout(typeLine1, 90);
  else {
    icon.style.opacity = "1";
    setTimeout(typeLine2, 300);
  }
}

function typeLine2() {
  const line2 = document.querySelector(".line2");
  const cursor = document.querySelector(".cursor");
  if (!line2 || !cursor) return;

  line2.textContent = text2.slice(0, j++);
  if (j <= text2.length) setTimeout(typeLine2, 90);
  else cursor.style.display = "none";
}

document.addEventListener("DOMContentLoaded", typeLine1);



const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
  navLinks.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => navLinks.classList.remove("show"))
  );
}



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href"))?.scrollIntoView({
      behavior: "smooth"
    });
  });
});


const albumSlider = document.querySelector(".album-slider");
const albumCards = document.querySelectorAll(".album-card");
const albumDotsContainer = document.querySelector(".slider-dots");

if (albumSlider && albumCards.length) {
  albumCards.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    albumDotsContainer.appendChild(dot);
  });

  const albumDots = document.querySelectorAll(".slider-dots .dot");

  albumSlider.addEventListener("scroll", () => {
    const cardWidth = albumCards[0].offsetWidth;
    const activeIndex = Math.round(albumSlider.scrollLeft / cardWidth);
    albumDots.forEach((dot, idx) => dot.classList.toggle("active", idx === activeIndex));
  });

  let albumIndex = 0;
  function autoAlbumSlide() {
    albumIndex = (albumIndex + 1) % albumCards.length;
    albumSlider.scrollTo({
      left: albumCards[albumIndex].offsetLeft,
      behavior: "smooth"
    });
    albumDots.forEach((d, idx) => d.classList.toggle("active", idx === albumIndex));
  }
  setInterval(autoAlbumSlide, 4000);
}



const albumImages = ["m1.jpg", "m2.jpg", "m3.jpg", "m6.jpg"];
let lightboxIndex = 0;

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  if (!lightbox || !img) return;

  lightboxIndex = index;
  img.src = albumImages[index];
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.style.display = "none";
}

function changeImage(direction) {
  lightboxIndex = (lightboxIndex + direction + albumImages.length) % albumImages.length;
  const img = document.getElementById("lightboxImg");
  if (img) img.src = albumImages[lightboxIndex];
}

albumCards.forEach((card, index) =>
  card.addEventListener("click", () => openLightbox(index))
);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

let startX = 0;
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  lightbox.addEventListener("touchstart", e => (startX = e.touches[0].clientX));
  lightbox.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) changeImage(1);
    else if (endX - startX > 50) changeImage(-1);
  });
}



window.addEventListener("load", () => {
  const popup = document.getElementById("popup");
  if (!popup) return;
  const shownBefore = sessionStorage.getItem("popupShown");

  if (!shownBefore) {
    setTimeout(() => {
      popup.style.display = "flex";
      sessionStorage.setItem("popupShown", "true");
    }, 1500);
  }
});

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

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

    if (!name || !email || !phone || !albumType) {
      alert("Please fill all required fields.");
      return;
    }

  // 🔥 Airtable Configuration
const AirtableToken = "patcTL0eRyuXO3z2v.67ceb296e99f6e24f6c3baf24732bbd739065923a7d8316731e620c9662c9277";
const BaseID = "appx9UG49cuJwude5";
const TableName = "tblLa2wKfiNCGDmDT";

try {
  const payload = {
    records: [
      {
        fields: {
          Name: name,
          Email: email,
          Phone: phone,
          Service: albumType,
          Message: message
        }
      }
    ]
  };

  const response = await fetch(`https://api.airtable.com/v0/${BaseID}/${TableName}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AirtableToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();  // <-- YE ADD KIYA

  console.log("Airtable Response:", result);  // <-- Yaha EXACT error aayega

  if (!response.ok) {
    alert("Airtable Error: Check console");
    return;
  }

} catch (error) {
  console.error("EXACT JS Error:", error);   // <-- JS error aayega
  alert("Airtable Connection Error! Console check karo.");
}



    // 🔥 WhatsApp Message
    const whatsappNumber = "919118602187";
    const whatsappMessage = encodeURIComponent(
      `📸 *New Album Booking Request!*\n\n` +
      `👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n💽 Album Type: ${albumType}\n💬 Message: ${message || "N/A"}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");

    // 🔥 Email Message
    const subject = encodeURIComponent("New Album Booking Request");
    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAlbum Type: ${albumType}\nMessage: ${message}`
    );
    const emailTo = "rg4116551@gmail.com";
    window.open(`mailto:${emailTo}?subject=${subject}&body=${emailBody}`, "_blank");

    // 🔥 Success Popup
    showSuccessPopup();

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
