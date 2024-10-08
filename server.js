const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
 


require('dotenv').config()
async function run() {
  // console.log(process.env.MONGODB_URI)
  // mongoose.connect('mongodb://127.0.0.1:27017/weatherdb'); //create db or/and connect
  await mongoose.connect(process.env.MONGODB_URI)
  const Weather = mongoose.model('Weather',
    {
      city: String, // create table and/or open
      temperature: String,
      date: String,
      rain: String,
      snow: String,
      pressure: String,
      browser: String
    });

  const Cars = mongoose.model('Cars',
    {
      image: String, // create table and/or open
      name: String,
      gear: String,
      engine: String,
      places: String,
    });



    const RequestSchema = new mongoose.Schema({
      product: String,
      name: String,
      phone: String,
      service: String,
      date: Date
  });
  
  const RequestModel = mongoose.model('Request', RequestSchema);
  const app = express()
  
  app.use(cors())
  const port = 5000
  
  app.use('/', express.static('public'))
  
  //app.use("/api/requests", requestRoutes);
  
  http://localhost:5000/data?lang=ru&temperature=C&lon=55&lat=44&units=metric
  app.get('/api/weather1', async (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let lang = req.query.lang
    let units = req.query.units
    let date = new Date()
    let browser = req.query.browser

    if (lat && lon && lang && units) {
      let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=7c871f23791e7e4646bb4bf648aca357`);
      // console.log(resWeather )
      let resWeatherJson = await resWeather.json()
      console.log(resWeatherJson)
      // console.log(await resWeather.json())
      res.json({  //после запроса ответ на фронтентенд
        'city': resWeatherJson.name,
        'temp': (resWeatherJson.main.temp).toFixed(2) + '°',
        'temp_max': (resWeatherJson.main.temp_max).toFixed(2) + '°',
        'temp_min': (resWeatherJson.main.temp_min).toFixed(2) + '°',
        'feels_like': (resWeatherJson.main.feels_like).toFixed(2) + '°',

        'pressure': (resWeatherJson.main.pressure).toFixed(0) + ' hPa',
        'humidity': resWeatherJson.main.humidity + '%',
        'weatherdesc': resWeatherJson.weather[0].description,
        'icon': resWeatherJson.weather[0].icon,
        'winddeg': resWeatherJson.wind.deg + '°',
        'windspeed': resWeatherJson.wind.speed + ' m/s',
        'rain': resWeatherJson.rain?.['1h'],
        'snow': resWeatherJson.snow?.['1h'],
      })
      // console.log(res)

      const newWeather = new Weather({ // create report
        'city': resWeatherJson.name,
        'temperature': (resWeatherJson.main.temp).toFixed(2),
        'date': date,
        'rain': resWeatherJson.rain?.['1h'],
        'snow': resWeatherJson.snow?.['1h'],
        'pressure': (resWeatherJson.main.pressure).toFixed(0) + ' hPa',
        'browser': browser
      })

      //const newWeather = new Weather()   //alternative for create report
      //newWeather.city =  resWeatherJson.name

      await newWeather.save();
      //commit
    } else {
      console.log('no data!')
    }

  })
  
  app.get('/api/cars', async (req, res) => {
    let cars = await Cars.find()
    res.json(cars)
  })
    app.get('/api/send', async (req, res) => {
    let send = await Okanswer.find()
    res.json(send)
    res.save();
  })

  //read
  // app.get('/api/log', async (req, res) => {
  //   let log = await Weather.find()
  //   res.json(log)
  // })

  // app.get('/api/send', async (req, res) => {
  //   let send = await Okanswer.find()
  //   res.json(send)
  //   res.save();
  // })

  //update
  // app.get('/api/log1', async (req, res) => {
  //   let log = await Weather.find() // findOne() // findById(id)
  //   log[1].city = 'PTZ'
  //   log[1].save()
  // })

  //delete
  // Weather.deleteMany // delete table


  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })
}
run();