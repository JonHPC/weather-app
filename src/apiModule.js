let url = `https://api.openweathermap.org/data/2.5/weather?q=London&APPID=73664a6c4f77b058e4b132cb234af364`;

async function getWeatherData(url){
    const response = await fetch(url);
    const weatherData = await response.json();

    return weatherData;
}



export {
    getWeatherData
}