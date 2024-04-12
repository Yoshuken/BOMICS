import { fetchData } from "./functions.js";

// UI html templates routing 
const comicsTab = document.querySelector("div#comics");
comicsTab.addEventListener("click", () => {
    const iframe = document.querySelector("iframe");
    iframe.src = './templates/comics.html';
});

const collectionElem = document.querySelector("#collection");
collectionElem.addEventListener("click", () => {
    const iframe = document.querySelector("iframe");
    iframe.src = './templates/mycolletion.html';
})

const booksTab = document.querySelector("#books");
booksTab.addEventListener("click", () => {
    const iframe = document.querySelector("iframe");
    iframe.src = './templates/books.html';
})

const logoElem = document.querySelector(".logo");
logoElem.addEventListener("click", () => {
    const iframe = document.querySelector("iframe");
    iframe.src = './templates/books.html';
})

const bodyElm = document.querySelector("body");

// debuggin
const searchObj = { from: "books" };
const searchObjString = JSON.stringify(searchObj);
localStorage.setItem('toggleTab', searchObjString);


// Add event listeners to each div
booksTab.addEventListener('click', (e) => {
    booksTab.classList.add('selected');
    comicsTab.classList.remove('selected');
    try { bodyElm.classList.remove("comics-style"); } catch (err) { }
    const searchObj = { from: "books" };
    const searchObjString = JSON.stringify(searchObj);
    localStorage.setItem('toggleTab', searchObjString);
});

comicsTab.addEventListener('click', (e) => {
    comicsTab.classList.add('selected');
    booksTab.classList.remove('selected');
    bodyElm.classList.add("comics-style");
    const searchObj = { from: "comics" };
    const searchObjString = JSON.stringify(searchObj);
    localStorage.setItem('toggleTab', searchObjString);
});

logoElem.addEventListener('click', (e) => {
    if (!booksTab.classList.selected) {
        booksTab.classList.add('selected');
        comicsTab.classList.remove('selected');
        const searchObj = { from: "books" };
        const searchObjString = JSON.stringify(searchObj);
        localStorage.setItem('toggleTab', searchObjString);
    }
});


(async () => {
    const login_token = localStorage.getItem("login_token_key");
    var res = await fetchData("http://localhost:3000/getEmail", "get", false, login_token);

    const userElm = document.querySelector("div.dropdown__text > span");
    userElm.innerHTML = res.email;

    userElm.addEventListener("click", () => {

    })
})();

(async() => {
    const logoutBtn = document.querySelector("div.dropdown > ul > li");

    logoutBtn.addEventListener("click", () => {
        location.href = "./sign.html";
    });
})();






