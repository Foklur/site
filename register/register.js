function registerbutton(e) {
    e.preventDefault();
    const data = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        confirmPassword: document.getElementById("conpassword").value.trim(),
        rememberMe: document.getElementById("remember").checked,
    };

    if (validateData(data)) {
        const form = document.forms["form-register"];
        form.reset(); // очищення полів форми
        console.log(data);

        if (data.rememberMe) {
            let date = new Date();
            date.setHours(date.getHours() + 1); // Кукі будуть зберігатися на 1 годину

            document.cookie = `email=${data.email}; path=/; expires=${date.toUTCString()}`;
            document.cookie = `password=${data.password}; path=/; expires=${date.toUTCString()}`;
        }

        document.location.href = "/home/home.html";
    } else {
        console.log("Not valid");
    }
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

    if (data.password !== data.confirmPassword) {
        showErrorLabel("confirmPasswordError", "Passwords must be the same");
        isValid = false;
    }

    return isValid;
}

function showErrorLabel(id, text) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerText = text;
    errorLabel.style.color = 'red';
    errorLabel.style.fontSize = '0.8em';
}