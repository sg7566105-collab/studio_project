// ===== LIGHTBOX =====
const images = ["m1.jpg", "m2.jpg", "m3.jpg", "m6.jpg"];
let currentIndex = 0;

function openLightbox(i) {
  currentIndex = i;
  const img = document.getElementById("lightboxImg");
  img.src = images[i];
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function changeImage(dir) {
  currentIndex = (currentIndex + dir + images.length) % images.length;
  document.getElementById("lightboxImg").src = images[currentIndex];
}

// ===== SECTION TOGGLE =====
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".gallery-section").forEach(sec => sec.classList.remove("visible"));
    document.getElementById(btn.dataset.target).classList.add("visible");
  });
});
// ==================== INSTAGRAM LIGHTBOX ====================
const instaImages = [
  "instagram1.jpg", "instagram2.jpg", "instagram3.jpg",
  "instagram4.jpg", "instagram5.jpg", "instagram1.jpg"
];
let instaIndex = 0;

function openInstaLightbox(i) {
  instaIndex = i;
  const lightbox = document.getElementById("instaLightbox");
  const img = document.getElementById("instaLightboxImg");
  img.src = instaImages[i];
  lightbox.style.display = "flex";
}

function closeInstaLightbox() {
  document.getElementById("instaLightbox").style.display = "none";
}

function changeInstaImage(dir) {
  instaIndex = (instaIndex + dir + instaImages.length) % instaImages.length;
  document.getElementById("instaLightboxImg").src = instaImages[instaIndex];
}

// Close with Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeInstaLightbox();
});

// Swipe on mobile
let startX = 0;
const instaLightbox = document.getElementById("instaLightbox");

instaLightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});
instaLightbox.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) changeInstaImage(1); // swipe left
  else if (endX - startX > 50) changeInstaImage(-1); // swipe right
});

