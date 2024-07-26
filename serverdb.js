const express = require('express')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/weatherdb');//create db or/and connect

const Weather = mongoose.model('Weather', 
  { city: String, // create table and/or open
    temperature: String,
    date: String
  });



const app = express()
const port = 5000

app.use('/', express.static('public'))

http://localhost:5000/data?lang=ru&temperature=C&lon=55&lat=44&units=metric
app.get('/api/weather', async (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let lang = req.query.lang
    let units = req.query.units
    let date = new Date()

    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=7c871f23791e7e4646bb4bf648aca357`);
    // console.log(resWeather )
    let resWeatherJson =  await resWeather.json()
    // console.log(resWeatherJson)
  res.json({  //после запроса ответ на фронтентенд
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
       'rain': resWeatherJson.rain?.['1h'],
    })
    const newWeather = new Weather({ // create report
      'city': resWeatherJson.name,
      'temperature': resWeatherJson.temp,
      'date': date,
    })
    //const newWeather = new Weather()   //alternative for create report
    //newWeather.city =  resWeatherJson.name

    newWeather.save().then(() => console.log('meow')); //commit

})

//read
app.get('/api/log', async (req, res) => {

  let log = await Weather.find()
  res.json(log)
})

//update
app.get('/api/log1', async (req, res) => {
  let log = await Weather.find() // findOne() // findById(id)
  log[1].city = 'PTZ'
  log[1].save()
})

//delete
// Weather.deleteMany // delete table


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})