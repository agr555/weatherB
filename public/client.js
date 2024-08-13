
console.log('Start')
let loadButton = document.getElementById('load')
let logButton = document.getElementById('log')

loadButton.onclick = async () => {

    async function success(position) {
        const lat = position.coords.latitude;//53.13; //
        const lon = position.coords.longitude;//4.11;//
        const lang = 'en'
        const dateNow = Date();
        // const lat = 50.45; //
        // const lon = 1.614852;//
        let result = await fetch(`/api/weather1?lat=${lat}&lon=${lon}&lang=${lang}&units=metric`);  
        let resJson = await result.json();
        // console.log(resJson);

        let name = document.getElementById('name');
        name.innerText = resJson.city;

        let temp = document.getElementById('temp');
        temp.innerText = resJson.temp;

        let max_temp = document.getElementById('max_temp'); 
        max_temp.innerText = resJson.temp_max;

        let min_temp = document.getElementById('min_temp'); 
        min_temp.innerText = resJson.temp_min;

        let pressure = document.getElementById('pressure'); 
        pressure.innerText = resJson.pressure;

        let humidity = document.getElementById('humidity'); 
        humidity.innerText = resJson.humidity;

        let icon = document.getElementById('icon');       
        icon.src =  `https://openweathermap.org/img/wn/${resJson.icon}@2x.png`;

        let weatherdesc = document.getElementById('weatherdesc');
        weatherdesc.innerText = resJson.weatherdesc;

        let winddeg = document.getElementById('winddeg');        
        winddeg.innerText = resJson.winddeg;

        let windspeed = document.getElementById('windspeed');
        windspeed.innerText = resJson.windspeed;

        let rain = document.getElementById('rain');  
        rain.innerText = resJson.rain?resJson.rain:'';

        let snow = document.getElementById('snow');  
        snow.innerText = resJson.snow?resJson.snow:'';

        let date = document.getElementById('date');  
        date.innerText = dateNow;

        status.textContent = "";
    }

    function error() {
        status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error);
    }

}
// logButton.onclick = async () => {
//     let result1 = await fetch(`/api/log`);  
//         let resJson1 = await result1.json();
//     console.log(resJson1)
// }

