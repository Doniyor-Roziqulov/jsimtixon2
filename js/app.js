const siteHeaderEnd = document.querySelector(".header-end");
const siteHeaderStart = document.querySelector(".header-start");
const tops = document.querySelector(".topk");
const navbar = document.querySelector(".navbar");
const jsBtn = document.querySelector(".js-btn");
const skeleton = document.querySelector(".skeleton");
const seeMoreBtn = document.querySelector(".see__more");
const collection = document.querySelector(".collection");

jsBtn.addEventListener("click", () => {
    navbar.classList.toggle("show");
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

for (let i = 0; i < 8; i++) {
    let skeletonItem = document.createElement("div");
    skeletonItem.classList.add("skeleton__item");
    skeletonItem.innerHTML = `
                            <div class="skeleton__image skeleton__anime"></div>
                            <div class="skeleton__line skeleton__anime"></div>
                            <div class="skeleton__line skeleton__anime"></div>
  `;
    skeleton.append(skeletonItem);
}

// ======================================

const wrapper = document.querySelector(".wrapper");
const API__URL = "https://fakestoreapi.com";

let offset = 1;
let perPageCount = 8;
let categoryValue = "";

async function fetchPosts(api, limit, category) {
    let response = await fetch(`${api}/products${category}?limit=${limit}`);
    response
        .json()
        .then((res) => createCard(res))
        .catch((err) => console.log(err))
        .finally(() => {
            skeleton.style.display = "none";
        });
}

fetchPosts(API__URL, perPageCount, "");

function createCard(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove();
    }
    data.forEach((post) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = post.id;
        card.innerHTML = `
        <div class="card__one">
        <img class="card__img"src=${post.image} alt="Images">
        <div class="card__iconbox">
            <button>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="17" r="17" fill="white"/>
                <path d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="17" r="17" fill="white"/>
                <path d="M26.257 15.962C26.731 16.582 26.731 17.419 26.257 18.038C24.764 19.987 21.182 24 17 24C12.818 24 9.23601 19.987 7.74301 18.038C7.51239 17.7411 7.38721 17.3759 7.38721 17C7.38721 16.6241 7.51239 16.2589 7.74301 15.962C9.23601 14.013 12.818 10 17 10C21.182 10 24.764 14.013 26.257 15.962V15.962Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        </div>
        <h3 class="card__title" title="${post.title}">${post.title}</h3>
        <div class="card__two">
        <p class="card__text">$${post.price}</p>
        <p class="card__count">(${post.rating.count})</p>
        
        </div>
        `;
        wrapper.appendChild(card);
    });
}

wrapper.addEventListener("click", (e) => {
    if (e.target.className.includes("card__img")) {
        window.open(
            `/pages/product.html?id=${e.target.closest(".card").dataset.id}`,
            "_self"
        );
    }
});

seeMoreBtn.addEventListener("click", () => {
    offset++;
    fetchPosts(API__URL, perPageCount * offset, categoryValue);
});

async function fetchCategory(api) {
    let response = await fetch(`${api}/products/categories`);
    response.json().then((res) => createCategory(res));
}

fetchCategory(API__URL);

function createCategory(data) {
    data.forEach((category) => {
        let list = document.createElement("li");
        list.className = "col-item";
        list.innerHTML = `
            <data value="/category/${category}">${category}</data>
        
        `;
        collection.appendChild(list);
    });
}

collection.addEventListener("click", (e) => {
    if (e.target.tagName === "DATA") {
        categoryValue = e.target.value;
        fetchPosts(API__URL, perPageCount, categoryValue);
    }
});
