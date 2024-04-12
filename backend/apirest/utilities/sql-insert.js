const connexion = require("./connexion.js");
const utilities = require("./scraping.js");
const utilities_c = require("./scraping-2.js");

async function fetchBookInfo(bookTitle, author) {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes";
    const queryParams = `?q=${encodeURIComponent(bookTitle)}+inauthor:${author}`;

    return fetch(apiUrl + queryParams)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const bookInfo = data.items[0].volumeInfo;
                return bookInfo;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}


async function insertBooks(func) {
    try {
        const books = await func();

        const booksPromises = books.map(book => fetchBookInfo(book.title, book.author));
        const infoBooks = await Promise.all(booksPromises);
        const infoBooksFil = infoBooks.filter((element) => {
            return element !== undefined;
        })
    
        infoBooksFil.forEach(book => {
            let query = `insert into display_books values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            connexion.query(query, [func.name, book.industryIdentifiers[0].identifier, book.title, book.authors[0], book.publishedDate, book.description, book.pageCount, thumbnailTry(book), book.infoLink], (error, results, fields) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Success');
                }
            });
        });
    } catch (err) {
        setTimeout(() => insertBooks(func), 3500);
    }
    
};

function thumbnailTry(book) {
    try {
        return book.imageLinks.thumbnail;
    } catch (error) {
        try {
            return book.imageLinks.smallThumbnail;
        } catch (error) {
            return null;
        }
    }
}

async function insertComics(func) {
    try {
        const comics = await func();
        comics.forEach(comic => {
            let query = `insert into display_comics values (?, ?, ?, ?)`;
            connexion.query(query, [func.name, comic.id, comic.title, comic.image], (error, results, fields) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Success');
                }
            });
        });
    } catch (err) {
        setTimeout(() => insertComics(func), 3000);
    }
}

async function insertAll() {
    await insertBooks(utilities.best);
    await insertBooks(utilities.newAdventure);
    await insertBooks(utilities.recommendation);
    await insertBooks(utilities.newRelease);
    await insertBooks(utilities.popular);
    await insertBooks(utilities.relics);
    await insertComics(utilities_c.bestSelling);
    await insertComics(utilities_c.topMagas);
    await insertComics(utilities_c.classicManga);
    console.log("end");
    
}

insertAll();








