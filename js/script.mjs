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
            weatherInfoElement.innerHTML = `<p>${capitalSentence}</p>`;
            temperatureElement.innerHTML = `<p>${temperature}°C</p>`;
            cityNameElement.innerHTML = `<p>${cityName}</p>`;
        
    if (data.weather[0].main == "Clouds"){
        weatherIcon.src= "../weather-images/cloud.png";
    } else if (data.weather[0].main == "Clouds"){
        weatherIcon.src= "../weather-images/cloud.png";
    } else if (data.weather[0].main == "Clear"){
        weatherIcon.src= "../weather-images/sun.png";
    } else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src= "../weather-images/drizzle.png";
    } else if (data.weather[0].main == "Rain"){
        weatherIcon.src= "../weather-images/rain.png";
    } else if (data.weather[0].main == "Mist"){
        weatherIcon.src= "../weather-images/mist.png";
    } else if (data.weather[0].main == "Snow"){
        weatherIcon.src= "../weather-images/snow.png";
    } else if (data.weather[0].main == "Thunderstorm"){
        weatherIcon.src= "../weather-images/thunder.png";
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