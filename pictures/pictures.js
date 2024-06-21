function getCookie() {
    const cookie = document.cookie;
    const obj = {};
    const values = cookie.split("; ");

    for (let i = 0; i < values.length; i++) {
        const item = values[i].split("=");
        obj[item[0]] = item[1];
    }

    return obj;
}


const cookies = getCookie();
const userActions = document.getElementById('user-actions');

if (cookies['email']) {
    userActions.innerHTML = `
                <span>Hello, ${cookies['email']}</span>
                <a href="/login/login.html">Sign Out</a>
            `;
} else {
    userActions.innerHTML = `
                <a href="/login/login.html">Login</a>
                <a href="/register/register.html">Register</a>
            `;
}


let currentPage = 1;
/*кароче тут можна зробить шоб було видном більше сторінок*/
const pageSize = 10;

async function fetchImages(page) {
    const apiKey = 'LGGdBOZgBXCaiooJC63DSdKHTDrjfbOfY8WbDT7oCXXtYYyxMP50zzYh';
    const response = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=${pageSize}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}


async function showImages(page) {
    const imagesContainer = document.getElementById('images-container');
    imagesContainer.innerHTML = '';
    const images = await fetchImages(page);

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.medium;
        imgElement.alt = image.photographer;
        imagesContainer.appendChild(imgElement);
    });

    document.getElementById('prev-button').disabled = page === 1;
    document.getElementById('next-button').disabled = images.length < pageSize;
}
showImages(currentPage);

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showImages(currentPage);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    currentPage++;
    showImages(currentPage);
});