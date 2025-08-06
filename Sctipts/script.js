import {weatherCodes} from "./weatherReport.js";
let searchByLocation = document.querySelector(".search input");
let temperature=document.querySelector(".temp");
let windSpeed=document.getElementById("wind");
let humidity=document.getElementById("humidity");
let visibility=document.getElementById("visibility");
let uv=document.getElementById("uv");
let weatherReport=document.getElementById("weatherReport");

let searchedLocation;
// Docs: https://open-meteo.com/en/docs
searchByLocation.addEventListener("keydown", async (e) => {
    if (e.key == "Enter") {
        searchedLocation = searchByLocation.value;
        const url = `https://api.api-ninjas.com/v1/geocoding?city=${searchedLocation}`;
        const options = {
            method: 'GET',
            headers: { 'X-Api-Key': 'Epadc5Zm38apeoISFzyHhg==qbAPnF21mfSlm2XO' },
            contentType: 'application/json'
        }
        let name_to_gcode;


        name_to_gcode = await fetch(url, options);
        name_to_gcode = await name_to_gcode.json();
        console.log(name_to_gcode);
        //gcode data passing to weather API


        let report = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${name_to_gcode[0].latitude}&longitude=${name_to_gcode[0].longitude}&hourly=temperature_2m,uv_index,wind_speed_10m,relative_humidity_2m,visibility,weather_code`);
        report = await report.json();
        console.log(report);
        temperature.innerHTML=`${report.hourly.temperature_2m[0]}&#176 C`;
        windSpeed.innerHTML=`${report.hourly.wind_speed_10m[0]} km/hour`;
        humidity.innerHTML=`${report.hourly.relative_humidity_2m[0]} %`


        let visibility_value=report.hourly.visibility[0];
        if(visibility_value>=1000){
            visibility.innerHTML=`${visibility_value/1000} km`
        }else{
            visibility.innerHTML=`${visibility_value} m`
        }

        uv.innerHTML=`${report.hourly.uv_index[0]} %`
        weatherReport.innerHTML=`${weatherCodes[report.hourly.weather_code[0]]}`;
        console.log(report.hourly.weather_code[0]);




    }

})






