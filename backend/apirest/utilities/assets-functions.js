
async function fetchBookInfo(value) {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes";
    const queryParams = `?q=${value}&maxResults=15`;

    return fetch(apiUrl + queryParams)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                return data;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}


module.exports.fetchBookInfo = fetchBookInfo;
