var city = 'kolkata'
const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
const options = {
    method: 'GET',
    headers: { 'X-Api-Key': 'Epadc5Zm38apeoISFzyHhg==qbAPnF21mfSlm2XO' },
    contentType: 'application/json'
}
let name_to_gcode;
async function getdata() {
    name_to_gcode = await fetch(url, options);
    name_to_gcode = await name_to_gcode.json();
console.log(name_to_gcode);
//gcode data passing to weather API

   
    let report=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${name_to_gcode[0].latitude}&longitude=${name_to_gcode[0].longitude}&hourly=temperature_2m,uv_index,wind_speed_180m`);
    report=await report.json();
    console.log(report);
   
}

