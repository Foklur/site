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

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Отримуємо значення кукі та налаштовуємо контент відповідно
const cookies = getCookie();
const userActions = document.getElementById('user-actions');

if (cookies['email']) {
    userActions.innerHTML = `
                <span>Hello, ${cookies['email']}</span>
                <a href="/signout">Sign Out</a>
            `;
} else {
    userActions.innerHTML = `
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            `;
}

// Функція для отримання прогнозу погоди з API WeatherAPI
async function fetchWeather(city) {
    const apiKey = 'c9e82927453b41e9889165727241906';
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
    const data = await response.json();
    return data.forecast.forecastday;
}

// Функція для відображення прогнозу погоди на сторінці
async function showWeather(city) {
    const weatherContainer = document.getElementById('weather-content');
    const locationTitle = document.getElementById('location-title');
    weatherContainer.innerHTML = ''; // Очистити попередні прогнози

    try {
        const forecastDays = await fetchWeather(city);

        // Оновлення заголовка місцезнаходження
        locationTitle.textContent = `Weather in ${city}`;

        forecastDays.forEach(day => {
            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');

            const weatherContent = `
                        <h2>${new Date(day.date).toLocaleDateString()}</h2>
                        <div class="weather-info">
                            <div>
                                <strong>Night:</strong>
                                <img src="https:${day.hour[0].condition.icon}" alt="${day.hour[0].condition.text}">
                                ${day.hour[0].temp_c}°C, ${day.hour[0].condition.text}, Wind: ${day.hour[0].wind_kph} kph, Precipitation: ${day.hour[0].chance_of_rain}%
                            </div>
                            <div>
                                <strong>Morning:</strong>
                                <img src="https:${day.hour[6].condition.icon}" alt="${day.hour[6].condition.text}">
                                ${day.hour[6].temp_c}°C, ${day.hour[6].condition.text}, Wind: ${day.hour[6].wind_kph} kph, Precipitation: ${day.hour[6].chance_of_rain}%
                            </div>
                            <div>
                                <strong>Day:</strong>
                                <img src="https:${day.hour[12].condition.icon}" alt="${day.hour[12].condition.text}">
                                ${day.hour[12].temp_c}°C, ${day.hour[12].condition.text}, Wind: ${day.hour[12].wind_kph} kph, Precipitation: ${day.hour[12].chance_of_rain}%
                            </div>
                            <div>
                                <strong>Evening:</strong>
                                <img src="https:${day.hour[18].condition.icon}" alt="${day.hour[18].condition.text}">
                                ${day.hour[18].temp_c}°C, ${day.hour[18].condition.text}, Wind: ${day.hour[18].wind_kph} kph, Precipitation: ${day.hour[18].chance_of_rain}%
                            </div>
                        </div>
                    `;

            weatherCard.innerHTML = weatherContent;
            weatherContainer.appendChild(weatherCard);
        });

        // Зберігаємо місто в куках
        setCookie('city', city, 7);
    } catch (error) {
        weatherContainer.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
}

// Обробник події для кнопки пошуку
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        showWeather(city);
    } else {
        alert('Please enter a city!');
    }
});

// Початкове відображення погоди для міста, яке збережено в куках
const savedCity = cookies['city'];
if (savedCity) {
    showWeather(savedCity);
}