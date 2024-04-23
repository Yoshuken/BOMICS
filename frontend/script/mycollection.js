import { fetchData, reloadPage } from './functions.js'
import { apiURL } from './constants.js';

const info = localStorage.getItem('toggleTab');
const tabType = JSON.parse(info);


const loadPage = async (tab) => {
    if (tab == "books") {
        try {
            const bodyElm = document.querySelector('body');
            bodyElm.classList.remove("comics-body");

            const indexBodyElm = parent.document.querySelector("body");
            indexBodyElm.classList.remove("comic-style");
            
            const articleElm = document.querySelector('article');
            articleElm.classList.remove("comics-article");
        } catch (err) { }
        finally {
            const login_token = localStorage.getItem("login_token_key");
            var res = await fetchData(apiURL + "bookCollection", "get", false, login_token);
        }
    } else {
        const bodyElm = document.querySelector('body');
        bodyElm.classList.add("comics-body");
        const indexBodyElm = parent.document.querySelector("body");
        indexBodyElm.classList.add("comic-style");

        const login_token = localStorage.getItem("login_token_key");
        var res = await fetchData(apiURL + "comicCollection", "get", false, login_token);
    }
    const collection = res.result;
    collection.forEach(item => {
        showArticle(item);
    });
}

loadPage(tabType.from);


function showArticle(art) {
    const articleElm = document.createElement("article");
    articleElm.classList.add("type-article");
    if (tabType.from == "books") {
        articleElm.classList.add("books-article");
    } else {
        articleElm.classList.add("comics-article");
    }

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-box");
    const imageElm = document.createElement("img");
    imageElm.setAttribute("src", art.image);
    imageElm.setAttribute("alt", "cover");
    imageDiv.appendChild(imageElm);
    articleElm.appendChild(imageDiv);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content-box");

    const topDiv = document.createElement("div");
    topDiv.classList.add("top-div");

    const h1Elm = document.createElement("h1");
    const h1Text = document.createTextNode(art.title)
    h1Elm.appendChild(h1Text);
    topDiv.appendChild(h1Elm);

    const scoreElm = document.createElement("h2");
    const scoreText = document.createTextNode(art.score);
    scoreElm.appendChild(scoreText);
    topDiv.appendChild(scoreElm);
    contentDiv.appendChild(topDiv);

    const descElm = document.createElement("p");
    const descText = document.createTextNode(`- ${art.review}`);
    descElm.appendChild(descText);
    contentDiv.appendChild(descElm);

    const botDiv = document.createElement('div');
    botDiv.classList.add("bot-div");
    if (tabType.from == "books") {
        const linkElm = document.createElement("a");
        linkElm.href = art.infoLink;
        linkElm.target = "_blank";
        linkElm.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
        botDiv.appendChild(linkElm);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    // When using an i element inside a btn, the eventlistener of the button with propagate to the i element, this one however will not trigger the event properly and your button will malfunction.
    deleteBtn.appendChild(document.createTextNode("DELETE"));
    if (tabType.from == "books") {
        deleteBtn.setAttribute("hidden-id", art.isbn);
        deleteBtn.setAttribute("id-from", "books");
    } else {
        deleteBtn.setAttribute("hidden-id", art.id);
        deleteBtn.setAttribute("id-from", "comics");
    };
    deleteBtn.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        deleteItem(e);
    });
    botDiv.appendChild(deleteBtn);

    contentDiv.appendChild(botDiv);
    articleElm.appendChild(contentDiv);

    const mainBox = document.querySelector('main');
    mainBox.appendChild(articleElm);
}


async function deleteItem(e) {
    const id = e.target.getAttribute("hidden-id");
    const login_token = localStorage.getItem("login_token_key");
    if (e.target.getAttribute("id-from") == "books") {
        var res = await fetchData(apiURL + "deleteBook", "delete", { "id": id }, login_token);
    } else {
        var res = await fetchData(apiURL + "deleteComic", "delete", { "id": id }, login_token);
    }
    e.target.innerHTML = '<i class="fa-solid fa-cog fa-spin"></i>';
    reloadPage();
}









