const express = require('express')
const app = express()
const port = 5000

app.use('/', express.static('public'))

http://localhost:5000/data?lang=ru&temperature=C&lon=55&lat=44&units=metric
app.get('/api/weather', async (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let lang = req.query.lang
    let units = req.query.units
    // let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);
    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=7c871f23791e7e4646bb4bf648aca357`);
    // console.log(resWeather )
    let resWeatherJson =  await resWeather.json()
    // console.log(resWeatherJson)
  res.json({
       'city': resWeatherJson.name,
       'temp': (resWeatherJson.main.temp).toFixed(2) + '°',
       'temp_max': (resWeatherJson.main.temp_max).toFixed(2) + '°',
       'temp_min': (resWeatherJson.main.temp_min).toFixed(2) + '°',
       'feels_like': (resWeatherJson.main.feels_like).toFixed(2) + '°',
       'humidity': resWeatherJson.main.humidity + '%',
       'weatherdesc': resWeatherJson.weather[0].description,
       'icon': resWeatherJson.weather[0].icon,
       'winddeg': resWeatherJson.wind.deg +'°',
       'windspeed': resWeatherJson.wind.speed,
       'rain': resWeatherJson.rain?.['1h']
    })
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})