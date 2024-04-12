import {fetchData} from './functions.js';
import { apiURL } from './constants.js';

async function loadBooks(carouselRow, type) {

    try {
        const response = await fetch(apiURL + type);
        const data = await response.json();
        const infoBooks = data.result

        infoBooks.forEach(book => {
            try {
                showBooks(book, carouselRow);
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

    const bookRow = new Flickity(carouselRow, option);

}


// Load Books function start
(() => {
    const popularRow = document.querySelector("#row-1 > div.books-row > div.carousel");
    loadBooks(popularRow, "popular");

    const bestRow = document.querySelector("#row-2 > div.books-row > div.carousel");
    loadBooks(bestRow, "best");

    const recRow = document.querySelector("#row-3 > div.books-row > div.carousel");
    loadBooks(recRow, "rec");

    const newRow = document.querySelector("#row-4 > div.books-row > div.carousel");
    loadBooks(newRow, "new");

    const relicsRow = document.querySelector("#row-5 > div.books-row > div.carousel");
    loadBooks(relicsRow, "relics");

    const adventureRow = document.querySelector("#row-6 > div.books-row > div.carousel");
    loadBooks(adventureRow, "adventure");
})();


const modalBtn = parent.document.querySelector("#yes-btn");
const resElm = parent.document.querySelector(".modal-content span");
modalBtn.addEventListener("click", async (e) => {
    const book = e.currentTarget.dataset.book;
    const login_token = localStorage.getItem('login_token_key');
    const res = await fetchData(apiURL + "insertBooks", "POST", { values: JSON.parse(book) }, login_token);
    if (res.response == "yes") {
        resElm.innerHTML = res.result;
    } else {
        resElm.innerHTML = res.result;
    }
    closeModal(); 
});

// close modal after adding an item
function closeModal() {
    const modal = parent.document.querySelector("#myModal");
    setTimeout(() => {
        modal.style.display = "none";
        resElm.innerHTML = "";
    }, 700);
}


function showBooks(book, carouselRow, cell = "cell-deco") {
    const bookElm = document.createElement("div");
    bookElm.classList.add("carousel-cell", cell);

    const imgElm = document.createElement("img");
    imgElm.setAttribute("src", book.image);
    imgElm.setAttribute("alt", "book image");
    imgElm.classList.add("book-cover");
    bookElm.appendChild(imgElm);

    const bookInfoElm = document.createElement("div");
    bookInfoElm.classList.add("book-info");

    const bookTitle = document.createElement("h3");
    const titleText = document.createTextNode(book.title);
    bookTitle.setAttribute("isbn", book.isbn);
    bookTitle.appendChild(titleText);
    bookInfoElm.appendChild(bookTitle);

    const bookAuthor = document.createElement("span");
    const authorText = document.createTextNode(book.author);
    bookAuthor.appendChild(authorText);
    bookInfoElm.appendChild(bookAuthor);

    const addBtn = document.createElement("button");
    addBtn.classList.add("addBtn");
    addBtn.appendChild(document.createTextNode("Add"));
    addBtn.addEventListener("click", (e) => {
        const modal = parent.document.querySelector("#myModal");
        const titleElm = parent.document.querySelector(".modal-content h4");
        titleElm.innerHTML = e.target.previousSibling.previousSibling.innerHTML;

        modalBtn.dataset.book = JSON.stringify(book);

        modal.style.display = "block";
    });
    bookInfoElm.appendChild(addBtn);

    bookElm.appendChild(bookInfoElm);

    carouselRow.appendChild(bookElm);
}







