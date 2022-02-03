
function updateWeatherText(data, units){
    const location = document.getElementById("location");
    const conditions = document.getElementById("conditions");
    const temperature = document.getElementById("temperature");
    const weather = document.getElementById("weather-icon");
    const tempUnitsText = document.getElementById("temp-units");
    const feelsLike = document.getElementById("feels-like");
    const wind = document.getElementById("wind");
    const humidity = document.getElementById("humidity");

    let tempUnit = '°C';
    let windUnit = 'm/s';

    if(units === 'imperial'){
        tempUnit = '°F';
        windUnit = 'mph'
    }

    location.textContent = `${data.name}`.toUpperCase();
    conditions.textContent = `${data.weather[0].description}`.toUpperCase();
    temperature.textContent = `TEMPERATURE: ${Math.round(data.main.temp)} ${tempUnit}`;
    weather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    tempUnitsText.textContent = `UNITS: ${tempUnit}`;
    feelsLike.textContent = `FEELS LIKE: ${data.main.feels_like} ${tempUnit}`; 
    wind.textContent = `WIND: ${data.wind.speed} ${windUnit}`;
    humidity.textContent = `HUMIDITY: ${data.main.humidity}%`;

}

function toggleUnits(units){

    const unitsText = document.getElementById("temp-units");

    if(units === "imperial"){
        units = "metric";
        unitsText.textContent = 'UNITS: °C';
        
    } else {
        units = "imperial";
        unitsText.textContent = 'UNITS: °F';
    };
    
    return units;
}


export{
    updateWeatherText,
    toggleUnits
}