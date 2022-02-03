import * as apiModule from "./apiModule";
import * as domModule from "./domModule";
import style from "./style.css";

//default data
let location = "los angeles";
let units = "imperial";
const weatherPromise = apiModule.getWeatherData(`https://api.openweathermap.org/data/2.5/weather?APPID=73664a6c4f77b058e4b132cb234af364&q=${location}&units=${units}`, {mode:'cors',});

weatherPromise.then((result)=> {
    console.log(result);
    domModule.updateWeatherText(result, "imperial");
});


const inputBox = document.getElementById("input-box");

document.querySelector("#input-form").addEventListener('submit', (e) => {
    e.preventDefault();

    if(inputBox.value){
        location = inputBox.value;
        displayData(location, units);
    } else{
        alert("Please input a city name");
    }
});

//toggles the units
const tempUnits = document.getElementById("temp-units");
tempUnits.addEventListener('click', () => {
    let newUnits = domModule.toggleUnits(units);
    units = newUnits;
    displayData(location, units);
    
});

function displayData(locationInput, unitsInput){
    let weatherPromise = apiModule.getWeatherData(`http://api.openweathermap.org/data/2.5/weather?APPID=73664a6c4f77b058e4b132cb234af364&q=${locationInput}&units=${unitsInput}`, {mode:'cors',});
    weatherPromise.then((result)=> {
    console.log(result);
    domModule.updateWeatherText(result, `${units}`);
    });
}






