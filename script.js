const apiKey = 'f1e2d772685d85ef7afd238e2b64ee7f';

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('An error occurred');
            }
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherDescription = data.weather[0].main.toLowerCase();
    const weatherIcon = document.getElementById('weather-icon');

    switch (weatherDescription) {
        case 'clear':
            const currentTime = new Date().getHours();
            if (currentTime >= 6 && currentTime < 18) {
                weatherIcon.className = 'fas fa-sun weather-icon';
            } else {
                weatherIcon.className = 'fas fa-moon weather-icon';
            }
            break;
        case 'clouds':
            weatherIcon.className = 'fas fa-cloud weather-icon';
            break;
        case 'rain':
            weatherIcon.className = 'fas fa-cloud-showers-heavy weather-icon';
            break;
        case 'snow':
            weatherIcon.className = 'fas fa-snowflake weather-icon';
            break;
        case 'thunderstorm':
            weatherIcon.className = 'fas fa-bolt weather-icon';
            break;
        case 'drizzle':
            weatherIcon.className = 'fas fa-cloud-rain weather-icon';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'fog':
        case 'sand':
        case 'dust':
        case 'ash':
        case 'squall':
        case 'tornado':
            weatherIcon.className = 'fas fa-smog weather-icon';
            break;
        default:
            weatherIcon.className = 'fas fa-cloud weather-icon';
            break;
    }

    document.getElementById('weather-description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById('weather-info').style.display = 'block';
}
