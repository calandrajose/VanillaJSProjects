const toggleBtn = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-nav");
});

open.addEventListener("click", () => {
    modal.classList.add("show");
});

modal.addEventListener("click", (e) =>
    e.target.id === "modal" || e.target.parentElement.id === "close"
        ? modal.classList.toggle("show")
        : false
);
