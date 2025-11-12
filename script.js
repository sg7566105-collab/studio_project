// ==================== TYPEWRITER EFFECT ====================
const text1 = "Crafting";
const text2 = "Memories";

let i = 0;
let j = 0;

function typeLine1() {
  const line1 = document.querySelector(".line1");
  const icon = document.querySelector(".icon");

  line1.textContent = text1.slice(0, i);
  i++;

  if (i <= text1.length) {
    setTimeout(typeLine1, 90);
  } else {
    icon.style.opacity = "1"; // Camera icon appears
    setTimeout(typeLine2, 300); // Start second line
  }
}

function typeLine2() {
  const line2 = document.querySelector(".line2");
  const cursor = document.querySelector(".cursor");

  line2.textContent = text2.slice(0, j);
  j++;

  if (j <= text2.length) {
    setTimeout(typeLine2, 90);
  } else {
    cursor.style.display = "none"; // Hide cursor
  }
}

// Run animation after DOM loads
document.addEventListener("DOMContentLoaded", typeLine1);

// ==================== IMAGE MODAL ====================
function openImage(src) {
  document.getElementById("modalImage").src = src;
  document.getElementById("imageModal").style.display = "flex";
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeImage();
});

// ==================== NAVBAR TOGGLE (MOBILE) ====================
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("show");
});

// Auto close menu on link click (mobile fix)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("show");
  });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ==================== HORIZONTAL SLIDER ====================
const slider = document.querySelector(".album-slider");
const cards = document.querySelectorAll(".album-card");
const dotsContainer = document.querySelector(".slider-dots");

// Create dots dynamically
cards.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Update dots on scroll
slider.addEventListener("scroll", () => {
  const cardWidth = cards[0].getBoundingClientRect().width;
  const activeIndex = Math.round(slider.scrollLeft / cardWidth);

  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[activeIndex]) dots[activeIndex].classList.add("active");
});

// ==================== AUTO SLIDE ====================
let currentIndex = 0;

function autoSlide() {
  currentIndex = (currentIndex + 1) % cards.length;
  slider.scrollTo({
    left: cards[currentIndex].offsetLeft,
    behavior: "smooth"
  });

  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

// Runs auto-slide every 4 seconds
setInterval(autoSlide, 4000);
