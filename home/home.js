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