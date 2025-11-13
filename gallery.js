(() => {
  // ==================== SECTION TOGGLE ====================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".gallery-section");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      sections.forEach(sec => sec.classList.remove("visible"));
      document.getElementById(btn.dataset.target).classList.add("visible");
    });
  });

  // ==================== ALBUM COLLECTIONS ====================
  const albumCollections = {
    wedding: {
      title: "Wedding Moments",
      images: [
        "m1.jpg",
        "m2.jpg",
        "m3.jpg",
        "m4.jpg"
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
    couple: {          // FIXED wrong key: "babyshoot" → "couple"
      title: "Couple Album",
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
  window.openAlbum = function(albumKey) {
    currentAlbum = albumCollections[albumKey];
    if (!currentAlbum) return;

    currentImageIndex = 0;

    const img = document.getElementById("albumImg");
    const caption = document.getElementById("albumCaption");
    const lightbox = document.getElementById("albumLightbox");

    img.src = currentAlbum.images[currentImageIndex];
    caption.textContent = `${currentAlbum.title} — Image ${currentImageIndex + 1} of ${currentAlbum.images.length}`;
    lightbox.style.display = "flex";
  };

  // ==================== CLOSE ALBUM ====================
  window.closeAlbum = function() {
    document.getElementById("albumLightbox").style.display = "none";
  };

  // ==================== CHANGE ALBUM IMAGE ====================
  window.changeAlbumImage = function(direction) {
    if (!currentAlbum) return;

    const img = document.getElementById("albumImg");
    const caption = document.getElementById("albumCaption");

    currentImageIndex = (currentImageIndex + direction + currentAlbum.images.length) % currentAlbum.images.length;

    img.style.opacity = 0;

    setTimeout(() => {
      img.src = currentAlbum.images[currentImageIndex];
      caption.textContent = `${currentAlbum.title} — Image ${currentImageIndex + 1} of ${currentAlbum.images.length}`;
      img.style.opacity = 1;
    }, 180);
  };

  // ==================== ESC CLOSE ====================
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeAlbum();
      closeInstaLightbox();
    }
  });

  // ==================== SWIPE HANDLER ====================
  function enableSwipe(lightbox, onLeft, onRight) {
    let startX = 0;

    lightbox.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) onLeft();      // left swipe
      else if (endX - startX > 50) onRight(); // right swipe
    });
  }

  enableSwipe(
    document.getElementById("albumLightbox"),
    () => changeAlbumImage(1),
    () => changeAlbumImage(-1)
  );

  // ==================== INSTAGRAM LIGHTBOX ====================
  const instaImages = [
    "instagram1.jpg",
    "instagram2.jpg",
    "instagram3.jpg",
    "instagram4.jpg",
    "instagram5.jpg",
    "instagram6.jpg"
  ];

  let instaIndex = 0;

  window.openInstaLightbox = function(i) {
    instaIndex = i;

    const lightbox = document.getElementById("instaLightbox");
    const img = document.getElementById("instaLightboxImg");

    img.src = instaImages[i];
    lightbox.style.display = "flex";
  };

  window.closeInstaLightbox = function() {
    document.getElementById("instaLightbox").style.display = "none";
  };

  window.changeInstaImage = function(direction) {
    instaIndex = (instaIndex + direction + instaImages.length) % instaImages.length;

    const img = document.getElementById("instaLightboxImg");
    img.style.opacity = 0;

    setTimeout(() => {
      img.src = instaImages[instaIndex];
      img.style.opacity = 1;
    }, 180);
  };

  enableSwipe(
    document.getElementById("instaLightbox"),
    () => changeInstaImage(1),
    () => changeInstaImage(-1)
  );

})();
