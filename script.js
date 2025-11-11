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
        icon.style.opacity = "1";      // Camera icon appear
        setTimeout(typeLine2, 300);    // Start line 2
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
        cursor.style.display = "none";   // Hide cursor after finish
    }
}

typeLine1();
function openImage(src) {
    document.getElementById("modalImage").src = src;
    document.getElementById("imageModal").style.display = "flex";
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}
