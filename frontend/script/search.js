import { fetchData } from "./functions.js";
import { apiURL } from "./constants.js";

const searchString = localStorage.getItem('inputValue');
const searchObj = JSON.parse(searchString);
const searchInput = document.querySelector("input");
searchInput.value = searchObj.value;


const bodyElm = document.querySelector("body");
if (searchObj.from == "books") {
    fetchSearch(searchObj.value);
} else {
    fetchSearch(searchObj.value, "searchComics");
    bodyElm.classList.add("comic-style");
}


async function fetchSearch(value, endpoint = "searchBooks") {
    const login_token = localStorage.getItem("login_token_key");
    const response = await fetchData(apiURL + endpoint, "post", { "value": value }, login_token);

    if (endpoint === "searchBooks") {
        response.result.items.forEach(book => {
            showResults(book.volumeInfo);
        });
    } else { 
        response.result.forEach(comic => {
            showResultsComics(comic);
        })
    }
}


const modalBtn = parent.document.querySelector(".modal-content button");
modalBtn.addEventListener("click", async (e) => {
    const login_token = localStorage.getItem("login_token_key");
    if (e.currentTarget.getAttribute("content-type") == "book") {
        const book = e.currentTarget.dataset.book;
        const res = await fetchData(apiURL + "searchInsertBooks", "POST", { values: JSON.parse(book) }, login_token);
        responseHandler(res);
    } else {
        const comic = e.currentTarget.dataset.comic;
        const res = await fetchData(apiURL + "insertComics", "POST", { values: JSON.parse(comic) }, login_token);
        responseHandler(res);
    }
});


function responseHandler(res) {
    const resElm = parent.document.querySelector("#myModal span");
    if (res.response == "yes") {
        resElm.innerHTML = res.result;
    } else {
        resElm.innerHTML = res.result;
    };
    closeModal(resElm);
}


function closeModal(res) {
    const modal = parent.document.querySelector("#myModal");
    setTimeout(() => {
        modal.style.display = "none";
        res.innerHTML = "";
    }, 700);
}


function showResults(source) {
    const mainContent = document.querySelector('section#content');

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-box");
    const image = document.createElement("img");
    image.setAttribute("src", getThumbnail(source));
    image.setAttribute("alt", "book cover");
    imageDiv.appendChild(image);

    const descripDiv = document.createElement("div");
    descripDiv.classList.add("description-box");

    descripDiv.innerHTML =
        `<h3>${source.title}</h3>
        <p>${source.description}</p>
    <span>${getAuthor(source)}</span>`

    const addBtn = document.createElement("button");
    addBtn.classList.add("addBtn");
    addBtn.appendChild(document.createTextNode("Add to collection"));
    addBtn.addEventListener("click", (e) => {
        const modal = parent.document.querySelector("#myModal");
        const titleElm = parent.document.querySelector(".modal-content h4");
        titleElm.innerHTML = e.target.parentElement.firstChild.innerHTML;

        modalBtn.dataset.book = JSON.stringify(source);
        modalBtn.setAttribute("content-type", "book");

        modal.style.display = "block";
    });
    descripDiv.appendChild(addBtn);

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("inner-box");

    innerDiv.appendChild(imageDiv);
    innerDiv.appendChild(descripDiv);

    mainContent.appendChild(innerDiv);
}


function showResultsComics(source) {
    const mainContent = document.querySelector('section#content');

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-box");
    const image = document.createElement("img");
    image.setAttribute("src", source.image);
    image.setAttribute("alt", "book cover");
    imageDiv.appendChild(image);

    const descripDiv = document.createElement("div");
    descripDiv.classList.add("description-box");

    descripDiv.innerHTML = `<h3>${source.title}</h3>`;

    const addBtn = document.createElement("button");
    addBtn.classList.add("addBtn");
    addBtn.appendChild(document.createTextNode("Add to collection"));
    addBtn.addEventListener("click", (e) => {
        const modal = parent.document.querySelector("#myModal");
        const titleElm = parent.document.querySelector(".modal-content h4");
        titleElm.innerHTML = e.target.parentElement.firstChild.innerHTML;

        modalBtn.dataset.comic = JSON.stringify(source);
        modalBtn.setAttribute("content-type", "comic");

        modal.style.display = "block";
    });
    descripDiv.appendChild(addBtn);

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("inner-box-comic");

    innerDiv.appendChild(imageDiv);
    innerDiv.appendChild(descripDiv);

    mainContent.appendChild(innerDiv);
}


// search bar
document.querySelector("input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.querySelector("#content").innerHTML = "";
        if (searchObj.from == "books") {
            fetchSearch(e.target.value);
        } else {
            fetchSearch(e.target.value, "searchComics");
            bodyElm.classList.add("comic-style");
        }
    }
});


// debugging tools
function getAuthor(s) {
    try {
        return s.authors[0];
    } catch {
        return "";
    }
}

function getThumbnail(s) {
    try {
        return s.imageLinks.thumbnail;
    } catch (error) {
        try {
            return s.imageLinks.smallThumbnail;
        } catch (error) {
            return "";
        }
    }
}