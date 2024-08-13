
console.log('Start')
let loadButton = document.getElementById('load')
let logButton = document.getElementById('log')

loadButton.onclick = async () => {
    const browserName = getBrowserName(navigator.userAgent);
    console.log(`Вы используете: ${browserName}`);

    async function success(position) {
        const lat = position.coords.latitude;//53.13; //
        const lon = position.coords.longitude;//4.11;//
        const userAgent = (navigator.userAgent).indexOf(10);
        const lang = 'en'
        const dateNow = Date();
        // const lat = 50.45; //
        // const lon = 1.614852;//
        let result = await fetch(`/api/weather1?lat=${lat}&lon=${lon}&lang=${lang}&units=metric&browser=${browserName}`);  
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
	
    console.log(navigator.userAgent);
    function getBrowserName(userAgent) {

        // Порядок важен, также возможно ложное срабатывание для браузеров не включённых в список
  
        
  
        //console.log(userAgent);
  
  
  
  if (userAgent.includes("Firefox")) {

       // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"

       return "Mozilla Firefox";

      } else if (userAgent.includes("SamsungBrowser")) {

       // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"

       return "Samsung Internet";

      } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {

       // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"

       return "Opera";

      } else if (userAgent.includes("YaBrowser")) {

        // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1.0.0 Safari/537.36

        return "YaBrowser";

      } else if (userAgent.includes("Edge")) {

       // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"

       return "Microsoft Edge (Legacy)";

      } else if (userAgent.includes("Edg")) {

       // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"

       return "Microsoft Edge (Chromium)";

      } else if (userAgent.includes("Chrome")) {

       // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"

       return "Google Chrome or Chromium";

      } else if (userAgent.includes("Safari")) {

       // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"

       return "Apple Safari";

      } else {

       return "unknown";

      }
    }
     


    
}

