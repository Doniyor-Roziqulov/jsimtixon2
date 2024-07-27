const API__URL = "https://fakestoreapi.com";
const content = document.querySelector(".content");
const siteHeaderStart = document.querySelector(".header-start");
const siteHeaderEnd = document.querySelector(".header-end");
const tops = document.querySelector(".topk");
const loading = document.querySelector(".loading");

async function fetchSingleData(api) {
    let query = new URLSearchParams(window.location.search);
    let id = query.get("id");

    let response = await fetch(`${api}/products/${id}`);
    response
        .json()
        .then((res) => createContent(res))
        .catch((err) => console.log(err))
    .finally(()=>{
        loading.style.display = "none"
    })
}

fetchSingleData(API__URL);

function createContent(data) {
    content.innerHTML = `
        <div class="pro__box">
                <div class="pro__imgbox">
                    <img class="pro__img" width="300" src=${data.image} alt="${data.title}">
                </div>
            <div class="pro__smallbox">
                <img class="pro__smallimg" width="60"src=${data.image} alt="images">
            </div>
        </div>
        <div class="pro__titlebox">
        <h3 class="pro__title">${data.title}</h3>
        <p class="pro__count">(${data.rating.count}) | <span>In Stock</span></p>
        <p class="pro__price">$${data.price}</p>
        <p class="pro__deck">${data.description}</p>
        </div>
    `;
}

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


let elh2 = document.querySelector(".count");
let elBtn1 = document.querySelector(".increase");
let elBtn2 = document.querySelector(".decrease");
let offset = 0;
function inc() {
    offset++;
    elh2.innerHTML = offset;
}

function dec() {
    if (offset <= 0) {
        return;
    }
    offset--;
    elh2.innerHTML = offset;
}