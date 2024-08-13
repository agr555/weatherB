const express = require('express')

const mongoose = require('mongoose');
require('dotenv').config()
// console.log(process.env.MONGODB_URI)
// mongoose.connect('mongodb://127.0.0.1:27017/weatherdb');//create db or/and connect
mongoose.connect(process.env.MONGODB_URI)
const Weather = mongoose.model('Weather',
  {
    city: String, // create table and/or open
    temperature: String,
    date: String,
    rain: String,
    snow: String,
    pressure: String
  });

// const Okanswer = mongoose.model('Okanswer',
//   {
//     name: String, // create table and/or open
//     phone: String,
//     choice: String,
//   });

const app = express()
const port = 5000

app.use('/', express.static('public'))

http://localhost:5000/data?lang=ru&temperature=C&lon=55&lat=44&units=metric
app.get('/api/weather1', async (req, res) => {
  let lat = req.query.lat
  let lon = req.query.lon
  let lang = req.query.lang
  let units = req.query.units
  let date = new Date()
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
    console.log(res)
    const newWeather = new Weather({ // create report
      'city': resWeatherJson.name,
      'temperature': (resWeatherJson.main.temp).toFixed(2),
      'date': date,
      'rain': resWeatherJson.rain?.['1h'],
      'snow': resWeatherJson.snow?.['1h'],
      'pressure': (resWeatherJson.main.pressure).toFixed(0) + ' hPa0'
    })



    //const newWeather = new Weather()   //alternative for create report
    //newWeather.city =  resWeatherJson.name

    await newWeather.save();
    //.then( async () =>
      
     // {
        console.log('I save record')
        console.log(newWeather)
    
    // app.get('/api/log', async (req, res) => {
    //   let log = await Weather.find()
    //   res.json(log)
    //   console.log(log)

    //   let log1 = await Weather.insertOne({
    //     'city': resWeatherJson.name,
    //     'temperature': (resWeatherJson.main.temp).toFixed(2),
    //     'date': date,
    //     'rain': resWeatherJson.rain?.['1h'],
    //     'snow': resWeatherJson.snow?.['1h'],
    //     'pressure': (resWeatherJson.main.pressure).toFixed(0) + ' hPa1'})
    //     await log1.save().then(() => console.log('save insert')); //commit
    //   res.json(log1)
    //   console.log(log1)

    // })
//   }
// );

      // let log1 =  Weather.insertMany([{
      //   'city': resWeatherJson.name,
      //   'temperature': (resWeatherJson.main.temp).toFixed(2),
      //   'date': date,
      //   'rain': resWeatherJson.rain?.['1h'],
      //   'snow': resWeatherJson.snow?.['1h'],
      //   'pressure': (resWeatherJson.main.pressure).toFixed(0) + ' hPa1'}],
      //   (err, result) => {
      //     if (err) {
      //         console.log('Unable insert user: ', err);
      //         throw err;
      //     }
      // }
      
      // )
        // await log1.save().then(() => console.log('save insert')); //commit
      // res.json(log1)
      // console.log(log1)

    //commit
  } else {
    console.log('no data!')
  }

  // app.post('/api/weather1', async (req, res) => {
  //   const newWeather = new Weather({ // create report
  //     'city': resWeatherJson.name,
  //     'temperature': (resWeatherJson.main.temp).toFixed(2),
  //     'date': date,
  //     'rain': resWeatherJson.rain?.['1h'],
  //     'snow': resWeatherJson.snow?.['1h'],
  //     'pressure': (resWeatherJson.main.pressure).toFixed(0) + ' hPa'
  //   })
  //   await newWeather.save().then(() => console.log('save')); //commit
  // })
  
  // app.get('/api/weather1', async (req, res) => {
  //   let log = await Weather.insertMany([{
  //     'city': resWeatherJson.name,
  //     'temperature': (resWeatherJson.main.temp).toFixed(2),
  //     'date': date,
  //     'rain': resWeatherJson.rain?.['1h'],
  //     'snow': resWeatherJson.snow?.['1h'],
  //     'pressure': (resWeatherJson.main.pressure).toFixed(0) + ' hPa'}])
  //     await log.save().then(() => console.log('save insert')); //commit
  //   res.json(log)
  // })
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
