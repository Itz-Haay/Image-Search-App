const apiAccessKey = "W8RLTXZdF-Sqo5OyrnbBA8fXVxESKGtq5ePVnlEsTJM";
const searchForm = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResultsCont = document.querySelector(".search-results-container");
const moreResultsBtn = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiAccessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResultsCont.innerHTML = "";
    }

    const results = data.results;
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-results-card");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsCont.appendChild(imageWrapper);
    })

    page++;

    if (page > 1) {
        moreResultsBtn.style.display = "block";
    }
}


searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

moreResultsBtn.addEventListener('click', () => {
    searchImages();
})