const siteHeaderEnd = document.querySelector(".header-end");
const siteHeaderStart = document.querySelector(".header-start");
const tops = document.querySelector(".topk");
const navbar = document.querySelector(".navbar");
const jsBtn = document.querySelector(".js-btn");

jsBtn.addEventListener("click", () => {
    // if (navbar.className != "show") {
    navbar.classList.toggle("show");
    // } else {
    //     navbar.classList.remove("show");
    // }
});

window.addEventListener("scroll", () => {
    let scrollValue = window.scrollY;
    if (scrollValue > 200) {
        siteHeaderEnd.classList.add("shrink");
        siteHeaderStart.style.display = "none";
    } else if (scrollValue <= 0) {
        tops.style.bottom = "-40px";
        siteHeaderEnd.classList.remove("shrink");
        siteHeaderStart.style.display = "block";
    }
    if (scrollValue > 50) {
        tops.style.bottom = "30px";
    }
});
