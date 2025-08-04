let searchByLocation = document.querySelector(".search input");
let temperature=document.querySelector(".temp")
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


        let report = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${name_to_gcode[0].latitude}&longitude=${name_to_gcode[0].longitude}&hourly=temperature_2m,uv_index,wind_speed_180m`);
        report = await report.json();
        console.log(report);
        temperature.innerHTML=`${report.hourly.temperature_2m[0]}&#176 C`;




    }

})






