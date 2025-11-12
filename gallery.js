// ==================== SECTION TOGGLE ====================
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".gallery-section").forEach(sec => sec.classList.remove("visible"));
    document.getElementById(btn.dataset.target).classList.add("visible");
  });
});

// ==================== ALBUM COLLECTIONS ====================
const albumCollections = {
  wedding: {
    title: "Wedding Moments",
    images: [
      "albums/wedding/1.jpg",
      "albums/wedding/2.jpg",
      "albums/wedding/3.jpg",
      "albums/wedding/4.jpg"
    ]
  },
  prewedding: {
    title: "Pre-Wedding",
    images: [
      "albums/prewedding/1.jpg",
      "albums/prewedding/2.jpg",
      "albums/prewedding/3.jpg"
    ]
  },
  engagement: {
    title: "Engagement",
    images: [
      "albums/engagement/1.jpg",
      "albums/engagement/2.jpg",
      "albums/engagement/3.jpg"
    ]
  },
  haldi: {
    title: "Haldi Ceremony",
    images: [
      "albums/haldi/1.jpg",
      "albums/haldi/2.jpg",
      "albums/haldi/3.jpg"
    ]
  },
  babyshoot: {
    title: "couple album",
    images: [
      "albums/couple/1.jpg",
      "albums/couple/2.jpg",
      "albums/couple/3.jpg"
    ]
  },
  birthday: {
    title: "Birthday Events",
    images: [
      "albums/birthday/1.jpg",
      "albums/birthday/2.jpg",
      "albums/birthday/3.jpg"
    ]
  }
};

let currentAlbum = null;
let currentImageIndex = 0;

// ==================== OPEN ALBUM LIGHTBOX ====================
function openAlbum(albumKey) {
  currentAlbum = albumCollections[albumKey];
  if (!currentAlbum) return;

  currentImageIndex = 0;
  const img = document.getElementById("albumImg");
  const caption = document.getElementById("albumCaption");
  const lightbox = document.getElementById("albumLightbox");

  img.src = currentAlbum.images[currentImageIndex];
  caption.textContent = `${currentAlbum.title} — Image ${currentImageIndex + 1} of ${currentAlbum.images.length}`;
  lightbox.style.display = "flex";
}

// ==================== CLOSE ALBUM ====================
function closeAlbum() {
  document.getElementById("albumLightbox").style.display = "none";
}

// ==================== CHANGE ALBUM IMAGE ====================
function changeAlbumImage(direction) {
  if (!currentAlbum) return;

  currentImageIndex = (currentImageIndex + direction + currentAlbum.images.length) % currentAlbum.images.length;

  const img = document.getElementById("albumImg");
  const caption = document.getElementById("albumCaption");

  img.style.opacity = 0;
  setTimeout(() => {
    img.src = currentAlbum.images[currentImageIndex];
    caption.textContent = `${currentAlbum.title} — Image ${currentImageIndex + 1} of ${currentAlbum.images.length}`;
    img.style.opacity = 1;
  }, 200);
}

// ==================== ESC KEY CLOSE ====================
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAlbum();
    closeInstaLightbox();
  }
});

// ==================== MOBILE SWIPE ====================
function setupSwipe(lightbox, onLeft, onRight) {
  let startX = 0;
  lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  lightbox.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) onLeft();       // Swipe left
    else if (endX - startX > 50) onRight(); // Swipe right
  });
}

setupSwipe(document.getElementById("albumLightbox"), 
  () => changeAlbumImage(1), 
  () => changeAlbumImage(-1)
);


// ==================== GLIMPSE LIGHTBOX ====================
const instaImages = [
  "instagram1.jpg",
  "instagram2.jpg",
  "instagram3.jpg",
  "instagram4.jpg",
  "instagram5.jpg",
  "instagram6.jpg"
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

function changeInstaImage(direction) {
  instaIndex = (instaIndex + direction + instaImages.length) % instaImages.length;
  const img = document.getElementById("instaLightboxImg");

  img.style.opacity = 0;
  setTimeout(() => {
    img.src = instaImages[instaIndex];
    img.style.opacity = 1;
  }, 200);
}

setupSwipe(document.getElementById("instaLightbox"), 
  () => changeInstaImage(1), 
  () => changeInstaImage(-1)
);
