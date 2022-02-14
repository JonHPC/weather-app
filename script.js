// Openweathermap API
const apiID = '73664a6c4f77b058e4b132cb234af364'; //Replace with your API

//set default coordinates to Los Angeles
let latitude = 34.052235;
let longitude = -118.243683;

//Initial units set to metric
let units = 'metric';
let windUnits = 'm/s';
let tempUnits = '°C';


const iconImg = document.getElementById('weather-icon');
const windDirArrow = document.getElementById('wind-dir-arrow');
const loc = document.getElementById('location');
const temperature = document.getElementById('temperature');
const conditionsText = document.getElementById('conditions');
const tempLowText = document.getElementById('temp-low');
const tempHighText = document.getElementById('temp-high');
const sunriseText = document.getElementById('sunrise');
const sunsetText = document.getElementById('sunset');
const feelsLikeText = document.getElementById('feels-like');
const windSpeedText = document.getElementById('wind-spd');
const windDirText = document.getElementById('wind-dir');
const humidityText = document.getElementById('humidity');
const pressureText = document.getElementById('pressure');

const inputBox = document.getElementById('input-box');
document.querySelector('#input-form').addEventListener('submit', (e) => {
  e.preventDefault();

  if(inputBox.value){
    getCoords(inputBox.value);
  }

  inputBox.value = "";
})

const toggleBtn = document.getElementById('toggle-units');
toggleBtn.addEventListener('click', toggleUnits);


//on loading the page, automatically update the DOM with the default location data
window.addEventListener('load', () => {
  updateDOM();
});


function updateDOM(){
  const base = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiID}&units=${units}`;

  // Using fetch to get data
  fetch(base)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp, temp_min,temp_max, feels_like, humidity, pressure } = data.main;
      const place = data.name;
      const { description, icon } = data.weather[0];
      const { sunrise, sunset} = data.sys;
      const {speed, deg} = data.wind;
      const timezone = data.timezone;
      console.log(timezone);

      //const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      const iconUrl = `./icons/${icon}.png`;

      // Converting Epoch(Unix) time to GMT
      const sunriseGMT = new Date(sunrise * 1000);
      const sunsetGMT = new Date(sunset * 1000);

      let cmHg = pressure / 13.332;
      let inHg =  cmHg * 0.3937;

      // Update DOM
      iconImg.src = iconUrl;
      windDirArrow.style.transform = `rotate(${deg}deg)`;
      loc.textContent = `${place}`;
      temperature.textContent = `${temp.toFixed(0)}${tempUnits}`;
      conditionsText.textContent = `${description}`;
      tempHighText.textContent = `H:${temp_max.toFixed(0)}°`;
      tempLowText.textContent = `L:${temp_min.toFixed(0)}°`;
      sunriseText.textContent = `${sunriseGMT.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
      sunsetText.textContent = `${sunsetGMT.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
      feelsLikeText.textContent = `${feels_like.toFixed(0)} ${tempUnits}`;
      windSpeedText.textContent = `${speed.toFixed(0)} ${windUnits}`;
      windDirText .textContent= `${deg}°`;
      humidityText.textContent = `${Math.round((humidity * 100) / 100)}%`;
      pressureText.textContent = `${inHg.toFixed(2)} inHg`;
    });
}

function toggleUnits(){
  if(units === 'imperial'){
    units = 'metric';
    windUnits = 'm/s';
    tempUnits = '°C';
    updateDOM();
  } else {
    units = 'imperial';
    windUnits = 'mph';
    tempUnits = '°F';
    updateDOM();
  }
}

async function getCoords(locationInput){
  const responseCoord = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiID}`);
  const weatherData = await responseCoord.json();
  const { coord } = weatherData;
  latitude = coord.lat;
  longitude = coord.lon;
  updateDOM();
}
