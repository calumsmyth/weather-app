document.addEventListener('DOMContentLoaded', function() {

//Declare variables containing apiKEY and specific HTML element 
const apiKey = '5f799550a09184063ae6a63c049e613b';
const getWeatherButton = document.getElementById("get-weather")
const weatherInfoElement = document.getElementById("weather-info")
const temperatureElement = document.getElementById("temperature")
const cityNameElement = document.getElementById("city")
const cityInput = document.getElementById("city-input")
const weatherIcon = document.getElementById("weather-icon")

//Create a function which allows a user to enter a city name
const fetchWeather = () => {
    const city = cityInput.value.trim();

    if (!city){
        weatherInfoElement.innerHTML = "Please enter a city name.";
        return;
    }
    
    //Make API request
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        //Convert API response into JSON format and console.log selected information under specified titles
        .then(response => response.json())
        .then(data => {
            console.log("Raw JSON response:", data);
            console.log("Processed JSON Data:", {
                city: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description
            })

            //Store retrieved data in invariables
            const cityName = data.name
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;

            //Create description with capitalised first letter. 
            const words = description.split(" ")
            for (let i = 0; i < words.length; i++){
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            const capitalSentence = words.join(" ")

            //Replace existing paragraph with new paragraph including retrieved information
            weatherInfoElement.innerHTML = `<p class="text-white">${capitalSentence}</p>`;
            temperatureElement.innerHTML = `<p class="text-white">${temperature}°C</p>`;
            cityNameElement.innerHTML = `<p class="text-white">${cityName}</p>`;
        
    //Add command for appropriate weather image to display for each weather condition.
    //NOTE - Routing works for hosing on GitHub, but not locally on Live server, need to change '/weather-app/ to './weather-images....'
    if (data.weather[0].main == "Clouds"){
        weatherIcon.src= "/weather-app/weather-images/cloud.png";
        weatherIcon.alt= "Cloudy weather";
    } else if (data.weather[0].main == "Clear"){
        weatherIcon.src= "/weather-app/weather-images/sun.png";
        weatherIcon.alt= "Sunny weather";
    } else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src= "/weather-app/weather-images/drizzle.png";
        weatherIcon.alt= "Drizzly weather";
    } else if (data.weather[0].main == "Rain"){
        weatherIcon.src= "/weather-app/weather-images/rain.png";
        weatherIcon.alt= "Rainy weather";
    } else if (data.weather[0].main == "Mist"){
        weatherIcon.src= "/weather-app/weather-images/mist.png";
        weatherIcon.alt= "Misty weather";
    } else if (data.weather[0].main == "Snow"){
        weatherIcon.src= "/weather-app/weather-images/snow.png";
        weatherIcon.alt= "Snowy weather"
    } else if (data.weather[0].main == "Thunderstorm"){
        weatherIcon.src= "/weather-app/weather-images/thunder.png";
        weatherIcon.alt= "Thunderstorms"
    } else {
        weatherIcon.src= "/weather-app/weather-images/city.png";
        weatherIcon.alt= "Image of a city"
    }

    })  
        //Error message if unable to retrieve data
        .catch(error => {
            console.log(`Error fetching weather data:`, error); //Returns the HTTP status code
            weatherInfoElement.innerHTML = '<p>Error fetching weather data</p>';
        });
    }

//Add event listener to 'Get Weather' button to call the above function when button is clicked
getWeatherButton.addEventListener("click", fetchWeather)
document.addEventListener("keypress", (e) => { 
    if (e.key == "Enter") {
        getWeatherButton.click()
    }
} )

});