const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "71e34139789cfd7628cd15c9c01457cf";


weatherForm.addEventListener("submit", async event => { 
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=f`;
    const response = await fetch(url);
    if (!response.ok){
        throw new Error("Failed to fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
    const {location: {name},
           current: {humidity, temperature, 
            weather_descriptions: [description], weather_icons: [photo]}} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherImg = document.createElement("img");

    cityDisplay.textContent = name;
    tempDisplay.textContent = `Temperature: ${temperature}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherImg.classList.add("weatherImg");

    weatherImg.src = photo;
    weatherImg.alt = description;
    weatherImg.style.width = "150px";
    weatherImg.style.height = "150px";
    weatherImg.style.objectFit = "cover";
    weatherImg.style.borderRadius = "10%";
    weatherImg.style.marginTop = "20px";
    weatherImg.style.marginBottom = "20px";

    card.append(cityDisplay, tempDisplay, humidityDisplay, descDisplay, weatherImg);
}

function displayError(message) {
    const errorElement = document.createElement("p");
    errorElement.textContent = message;
    errorElement.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorElement);  
}