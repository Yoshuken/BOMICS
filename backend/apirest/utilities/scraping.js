const axios = require('axios');
const cheerio = require('cheerio');

async function popular() {
    const url = 'https://www.goodreads.com/book/popular_by_date/2024';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('div.BookListItem__body').each((i, elem) => {
        const title = $(elem).find('a[data-testid=bookTitle]').text();
        const author = $(elem).find('span[data-testid=name]').text();
        results.push({ title, author });
    });

    return results;
}

async function best() {
    const url = 'https://www.amazon.com/gp/bestsellers/2024/books';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('div.a-column.a-span12.a-text-center._cDEzb_grid-column_2hIsc').each((i, elem) => {
        const title = $(elem).find('div._cDEzb_p13n-sc-css-line-clamp-1_1Fn1y').text();
        const author = $(elem).find('div.a-row.a-size-small').find("div._cDEzb_p13n-sc-css-line-clamp-1_1Fn1y").text();
        results.push({ title, author });
    });

    return results;
}

// async callback test syntax
// const test = async() => {
//     const result = await best();
//     console.log(result);
// }

async function recommendation() {
    const url = 'https://www.panmacmillan.com/blogs/general/must-read-books-of-all-time';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('figure.block.float-left.w-full.mb-4.book-spotlight').each((i, elem) => {
        const title = $(elem).find('h3 > a').text();
        const author = $(elem).find('h4 > a > span').text();
        results.push({ title, author });
    });

    return results.slice(0, 20);
}


async function newRelease() {
    const url = 'https://www.amazon.com/gp/new-releases/books/?ie=UTF8&ref_=sv_b_2';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('div.a-column.a-span12.a-text-center._cDEzb_grid-column_2hIsc').each((i, elem) => {
        const title = $(elem).find('div._cDEzb_p13n-sc-css-line-clamp-1_1Fn1y').text();
        const author = $(elem).find('div.a-row.a-size-small').find("div._cDEzb_p13n-sc-css-line-clamp-1_1Fn1y").text();
        results.push({ title, author });
    });

    return results;
}

async function relics() {
    const url = 'https://www.goodreads.com/shelf/show/classic-literature';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('div.elementList').each((i, elem) => {
        const title = $(elem).find('a.bookTitle').text().split(" (")[0];
        const author = $(elem).find('span[itemprop="name"]').text();
        results.push({ title, author });
    });

    return results;
}


async function newAdventure() {
    const url = 'https://www.penguinrandomhouse.com/the-read-down/indie-bookstore-recommendations/';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('li.inner-facade').each((i, elem) => {
        const title = $(elem).find('a[href*="books"]').text();
        const author = $(elem).find('a[href*="authors"]').text();
        results.push({ title, author });
    });

    return results;
}


// multiple export syntax 
module.exports.popular = popular;
module.exports.best = best;
module.exports.recommendation = recommendation;
module.exports.newRelease = newRelease;
module.exports.relics = relics;
module.exports.newAdventure = newAdventure;