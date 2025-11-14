(() => {
  
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


  const albumCollections = {
    wedding: {
      title: "Wedding Moments",
      images: [
        "w (1).jpg",
        "w (2).jpg",
        "w (3).jpg",
        "w (4).jpg"
      ]
    },
    prewedding: {
      title: "Pre-Wedding",
      images: [
        "p.jpg",
        "p (1).jpg",
        "p (2).jpg",
        "p (3).jpg",
        "p (4).jpg"
      ]
    },
    engagement: {
      title: "Engagement",
      images: [
        "e (1).jpg",
        "e (2).jpg",
        "e (3).jpg"
      ]
    },
    haldi: {
      title: "Haldi Ceremony",
      images: [
        "h (1).jpg",
        "h (2).jpg",
        "h (3).jpg",
        "h (4).jpg",
        "h (5).jpg"
      ]
    },
    couple: {          
      title: "Couple Album",
      images: [
        "c (1).jpg",
        "c (2).jpg",
        "c (3).jpg",
        "c (4).jpg"
      ]
    },
    birthday: {
      title: "Birthday Events",
      images: [
        "b (1).jpg",
        "b (2).jpg",
        "b (3).jpg",
        "b (4).jpg"
      ]
    }
  };

  let currentAlbum = null;
  let currentImageIndex = 0;

  
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

  
  window.closeAlbum = function() {
    document.getElementById("albumLightbox").style.display = "none";
  };

  
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

  
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeAlbum();
      closeInstaLightbox();
    }
  });

  
  function enableSwipe(lightbox, onLeft, onRight) {
    let startX = 0;

    lightbox.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) onLeft();      
      else if (endX - startX > 50) onRight(); 
    });
  }

  enableSwipe(
    document.getElementById("albumLightbox"),
    () => changeAlbumImage(1),
    () => changeAlbumImage(-1)
  );

  
  const instaImages = [
    "instagram1.jpg",
    "instagram2.jpg",
    "instagram3.jpg",
    "instagram4.jpg",
    "instagram5.jpg",
    "instagram1.jpg"
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
