import { customAlert } from "./alert.js";


async function fetchData(url, method, bodyData, loginToken) {
    try {
        const headers = { "Content-Type": "application/json" };
        if (loginToken) headers["Authorization"] = "Bearer " + loginToken;
        if (bodyData === false && method.toUpperCase() === 'GET') {
            const response = await fetch(url, {
                method: method,
                headers,
            });
            return await response.json();
        } else {
            const response = await fetch(url, {
                method: method,
                headers,
                body: JSON.stringify(bodyData),
            });
            return await response.json();
        }
    } catch (error) {
        customAlert.alert(error, "Server Error");
    }
};

function reloadPage() {
    setTimeout(() => {
        location.reload();
    }, 2000);
}

export {fetchData, reloadPage};
