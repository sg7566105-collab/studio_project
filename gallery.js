const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const dotsContainer = document.getElementById("dotsContainer");

let currentIndex = 0;

// Open image
galleryImages.forEach((img, i) => {
  img.addEventListener("click", () => {
    openLightbox(i);
  });
});

function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.add("active");
  updateLightbox();
  createDots();
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

function changeImage(dir) {
  currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
  updateLightbox();
}

function updateLightbox() {
  lightboxImg.src = galleryImages[currentIndex].src;
  updateDots();
}

// Create dots
function createDots() {
  dotsContainer.innerHTML = "";
  galleryImages.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateLightbox();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Swipe (mobile)
let startX = 0;
lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
lightbox.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) changeImage(1);
  else if (endX - startX > 50) changeImage(-1);
});

// Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});
