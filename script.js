// ==================== TYPEWRITER EFFECT ====================
const text1 = "Crafting";
const text2 = "Memories";

let i = 0, j = 0;

function typeLine1() {
  const line1 = document.querySelector(".line1");
  const icon = document.querySelector(".icon");
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
  line2.textContent = text2.slice(0, j++);
  if (j <= text2.length) setTimeout(typeLine2, 90);
  else cursor.style.display = "none";
}

document.addEventListener("DOMContentLoaded", typeLine1);


// ==================== NAVBAR TOGGLE ====================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("show")));


// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});


// ==================== ALBUM SLIDER ====================
const albumSlider = document.querySelector(".album-slider");
const albumCards = document.querySelectorAll(".album-card");
const albumDotsContainer = document.querySelector(".slider-dots");

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
  albumSlider.scrollTo({ left: albumCards[albumIndex].offsetLeft, behavior: "smooth" });
  albumDots.forEach((d, idx) => d.classList.toggle("active", idx === albumIndex));
}
setInterval(autoAlbumSlide, 4000);


// ==================== LIGHTBOX SYSTEM ====================
const albumImages = ["m1.jpg", "m2.jpg", "m3.jpg", "m6.jpg"];
let lightboxIndex = 0;

function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  img.src = albumImages[index];
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
  lightboxIndex = (lightboxIndex + direction + albumImages.length) % albumImages.length;
  document.getElementById("lightboxImg").src = albumImages[lightboxIndex];
}

// Bind clicks on album cards
albumCards.forEach((card, index) => card.addEventListener("click", () => openLightbox(index)));

// Escape key close
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

// Swipe on mobile
let startX = 0;
const lightbox = document.getElementById("lightbox");
lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
lightbox.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) changeImage(1);
  else if (endX - startX > 50) changeImage(-1);
});
