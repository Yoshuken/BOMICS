import { fetchData } from "./functions.js";
import { apiURL } from "./constants.js";

async function loadComic(carouselRow, type) {

    try {
        const response = await fetch(apiURL + type);
        const data = await response.json();
        const infoManga = data.result

        infoManga.forEach(manga => {
            try {
                showComic(manga, carouselRow);
            } catch (err) {
                console.log(err)
            }
        });

    } catch (err) {
        console.log(err);
    }

    const option = {
        "cellAlign": "center",
        "wrapAround": true,
        "pageDots": false,
        "prevNextButtons": false,
        "autoPlay": 10000,
    };

    const comicsRow = new Flickity(carouselRow, option);

}


// Load Books function start
(() => {
    const popularRow = document.querySelector("#row-1 > div.comics-row > div.carousel");
    loadComic(popularRow, "topManga");

    const bestRow = document.querySelector("#row-2 > div.comics-row > div.carousel");
    loadComic(bestRow, "bestManga");

    const relicsRow = document.querySelector("#row-3 > div.comics-row > div.carousel");
    loadComic(relicsRow, "classicManga");

})();


const modalBtn = parent.document.querySelector(".modal-content button");
const resElm = parent.document.querySelector(".modal-content span")
modalBtn.addEventListener("click", async (e) => {
    const comic = e.currentTarget.dataset.comic;
    const comic_json = JSON.parse(comic);
    const score = parent.document.querySelector("#score");
    const review = parent.document.querySelector("#review");

    comic_json["score"] = score.value;
    comic_json["review"] = review.value;

    const login_token = localStorage.getItem("login_token_key");
    const res = await fetchData(apiURL + "insertComics", "POST", { values: comic_json }, login_token);
    resElm.innerHTML = res.result;
    closeModal(score, review);
});

function closeModal(x, y) {
    const modal = parent.document.querySelector("#myModal");
    setTimeout(() => {
        modal.style.display = "none";
        resElm.innerHTML = "";
        x.value = "";
        y.value = "";
    }, 700);
}

function showComic(comic, carouselRow, cell = "cell-deco") {
    const comicElem = document.createElement("div");
    comicElem.classList.add("carousel-cell", cell);

    const imgElm = document.createElement("img");
    imgElm.setAttribute("src", comic.image);
    imgElm.setAttribute("alt", "comic image");
    imgElm.classList.add("comic-cover");
    comicElem.appendChild(imgElm);

    const comicInfoElem = document.createElement("div");
    comicInfoElem.classList.add("comic-info");

    const comicTitle = document.createElement("h3");
    const titleText = document.createTextNode(comic.title);
    comicTitle.appendChild(titleText);
    comicInfoElem.appendChild(comicTitle);

    const addBtn = document.createElement("button");
    addBtn.classList.add("addBtn");
    addBtn.appendChild(document.createTextNode("Add"));
    addBtn.addEventListener("click", (e) => {
        const modal = parent.document.querySelector("#myModal");
        const titleElm = parent.document.querySelector(".modal-content h4");
        titleElm.innerHTML = e.target.previousSibling.innerHTML;

        modalBtn.dataset.comic = JSON.stringify(comic);

        modal.style.display = "block";
    });

    comicInfoElem.appendChild(addBtn);
    comicElem.appendChild(comicInfoElem);

    carouselRow.appendChild(comicElem);
}

