function loginbutton(e) {
    e.preventDefault();
    const data = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
    };

    if (validateData(data)) {
        const form = document.forms["form-login"];
        form.reset(); // очищення полів форми
        console.log(data);
        const cookies = checkLoginCookie();
        if (cookies.email && cookies.password) {
            alert('Successful login!');
            document.location.href = "/home/home.html";
        } else {
            alert('You not register!');
            console.log("Cookies not found");
        }
    } else {
        console.log("Not valid");
    }
}

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

function checkLoginCookie() {
    const cookie = getCookie();
    const result = {};

    if ("email" in cookie && "password" in cookie) {
        result.email = cookie.email;
        result.password = cookie.password;
    }

    return result;
}

function showErrorLabel(id, text) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerText = text;
    errorLabel.style.color = 'red';
    errorLabel.style.fontSize = '0.8em';
}

function validateData(data) {
    const regexEmail = /^[\w.-]{3,}@[\w-]+\.[a-z]{2,4}$/i;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    let isValid = true;

    if (!regexEmail.test(data.email)) {
        showErrorLabel("emailError", "Invalid email format");
        isValid = false;
    }

    if (data.password.length < 6 || !regexPassword.test(data.password)) {
        showErrorLabel("passwordError", "Invalid password format");
        isValid = false;
    }

    return isValid;
}

