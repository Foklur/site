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
const pageSize = 1;

async function fetchNews(page) {
    const apiKey = '9b1fc0120322416d88c2fb751292ad60';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
    const data = await response.json();
    return data.articles;
}

async function showNews(page) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const articles = await fetchNews(page);

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        const articleContent = `
                    <h2>${article.title}</h2>
                    <p><small>${new Date(article.publishedAt).toLocaleDateString()}</small></p>
                    <img src="${article.urlToImage || 'placeholder.jpg'}" alt="${article.title}">
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;

        articleElement.innerHTML = articleContent;
        newsContainer.appendChild(articleElement);
    });

    document.getElementById('prev-button').disabled = page === 1;
    document.getElementById('next-button').disabled = articles.length < pageSize;
}
showNews(currentPage);

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showNews(currentPage);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    currentPage++;
    showNews(currentPage);
});