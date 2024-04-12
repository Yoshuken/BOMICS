const axios = require('axios');
const cheerio = require('cheerio');
const { MANGA } = require('@consumet/extensions');



async function fetchMangaInfo(title) {
    const mangaSearcher = new MANGA.Mangasee123;

    const result = await mangaSearcher.search(title);
    return result.results[0];

}

async function searchMangas(title) {
    const modifiedTitle = title.replace('', '%20');
    const url = `https://myanimelist.net/manga.php?cat=manga&q=${modifiedTitle}`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('tbody > tr').each((i, elem) => {
        const title = $(elem).find('strong').text();
        results.push({ title });
    });

    return cleanTitles(results);
}

function cleanTitles(array) {
    const cleanTitles = [];
    array.forEach(title => {
        if (title.title !== '') {
            cleanTitles.push(title);
        }
    });
    return cleanTitles
}

async function getMangaInfo(title) {
    try {
        const titles = await searchMangas(title);

        const mangaInfoPromise = titles.map(title => fetchMangaInfo(title.title));

        const mangaInfo = await Promise.all(mangaInfoPromise);

        const mangaInfoClean = mangaInfo.filter((element) => {
            return element !== undefined;
        })
        return mangaInfoClean;
    } catch (error) {
        console.error(error);
    }
}

async function fetchAndReturn(array) {
    const mangaInfoPromise = array.map(title => fetchMangaInfo(title.title));

    const mangaInfo = await Promise.all(mangaInfoPromise);

    const mangaInfoClean = mangaInfo.filter((element) => {
        return element !== undefined;
    });

    return mangaInfoClean;
}

async function topMangas() {
    const url = 'https://myanimelist.net/topmanga.php?type=manga';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('tbody > tr.ranking-list').each((i, elem) => {
        const title = $(elem).find('a.hoverinfo_trigger.fs14.fw-b').text();
        results.push({ title });
    });

    return fetchAndReturn(results);
}

async function bestSelling() {
    const url = 'https://en.wikipedia.org/wiki/List_of_best-selling_manga';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(15) > tbody > tr').each((i, elem) => {
        const title = $(elem).find('td:nth-of-type(1) a').text();
        results.push({ title });
    });

    return fetchAndReturn(cleanTitles(results));
}

async function classicManga() {
    const url = 'https://www.goodreads.com/list/show/39409.Manga_Released_Before_2000';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];
    $('#all_votes > table > tbody > tr').each((i, elem) => {
        const title = $(elem).find('td:nth-child(3) > a > span').text();
        results.push({ title });
    });

    const parseResult = results.map(res => ({title: res.title.split(',')[0]}));
    return fetchAndReturn(cleanTitles(parseResult.slice(0, 25)));
}


// (async () => {
//     const result = await classicManga();
//     console.log(result);
// })();


module.exports.getMangaInfo = getMangaInfo;
module.exports.topMagas = topMangas;
module.exports.bestSelling = bestSelling;
module.exports.classicManga = classicManga;


