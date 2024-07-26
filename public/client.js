console.log(1)
let loadButton = document.getElementById('load')

loadButton.onclick = async () => {

    async function success(position) {
        const lat = position.coords.latitude;//53.13; //
        const lon = position.coords.longitude;//4.11;//
        const lang = 'en'
        // const lat = 50.45; //
        // const lon = 1.614852;//
        let result = await fetch(`/api/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=metric`);    //lang=ru&temperature=C&lon=55&lat=44&units=metric
        let resJson = await result.json();
        // console.log(resJson);

        let name = document.getElementById('name');
        name.innerText = resJson.city;

        let temp = document.getElementById('temp'); // temp.innerText =  (resJson['main']['temp']-273.15).toFixed(2) + '°';
        temp.innerText = resJson.temp;

        let max_temp = document.getElementById('max_temp'); // max_temp.innerText =  (resJson['main']['temp_max']-273.15).toFixed(2) + '°';
        max_temp.innerText = resJson.temp_max;

        let min_temp = document.getElementById('min_temp'); // min_temp.innerText =   (resJson['main']['temp_min']-273.15).toFixed(2) + '°';;
        min_temp.innerText = resJson.temp_min;

        let feels_like = document.getElementById('feels_like');  // feels_like.innerText =  (resJson['main']['feels_like']-273.15).toFixed(2) + '°';;
        feels_like.innerText = resJson.feels_like;

        let humidity = document.getElementById('humidity'); // humidity.innerText =  resJson['main']['humidity']+'%';
        humidity.innerText = resJson.humidity;

        let icon = document.getElementById('icon');       // const iconcode= resJson['weather'][0]['icon'];
        icon.src =  `https://openweathermap.org/img/wn/${resJson.icon}@2x.png`;

        let weatherdesc = document.getElementById('weatherdesc');        // weatherdesc.innerText =  resJson['weather'][0]['description']
        weatherdesc.innerText = resJson.weatherdesc;

        let winddeg = document.getElementById('winddeg');        // winddeg.innerText =  resJson['wind']['deg']+'°'
        winddeg.innerText = resJson.winddeg;

        let windspeed = document.getElementById('windspeed');        // windspeed.innerText =  resJson['wind']['speed']
        windspeed.innerText = resJson.windspeed;

        let rain = document.getElementById('rain');        // rain.innerText =  resJson['rain']['1h']
        rain.innerText = resJson.rain?resJson.rain:'';

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


