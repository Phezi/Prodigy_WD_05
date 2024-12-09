// Display current date
function displayDate() {
    const dateDiv = document.getElementById("date-display");
    const currentDate = new Date();
    
    // Format the date (e.g., "December 9, 2024")
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    // Display the date
    dateDiv.textContent = `Today's Date: ${formattedDate}`;
}

// Fetch and display weather data
async function getWeather() {
    const apiKey = 'c529fdb7f6294f25bab131311240212'; // Your WeatherAPI key
    const city = document.getElementById('city').value;
    const weatherIcon = document.getElementById('weather-icon');
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('Weather-info');

    // Clear previous data
    weatherIcon.style.display = 'none';
    weatherIcon.src = '';
    weatherIcon.alt = 'Weather Icon';
    tempDiv.innerHTML = '';
    weatherInfo.innerHTML = '';

    if (!city) {
        weatherInfo.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();

        // Update weather details
        weatherIcon.src = `https:${weatherData.current.condition.icon}`;
        weatherIcon.alt = weatherData.current.condition.text;
        weatherIcon.style.display = 'block';
        tempDiv.innerHTML = `${weatherData.current.temp_c}°C`;
        weatherInfo.innerHTML = `
            <p>${weatherData.current.condition.text}</p>
            <p>Humidity: ${weatherData.current.humidity}%</p>
            <p>Wind Speed: ${weatherData.current.wind_kph} km/h</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Display the date when the page loads
window.onload = displayDate;

