const express = require('express')
const app = express()
const port = 2000

var cors = require('cors')
app.use(cors())

app.use(express.json())

/*DB*/
//#region Mongo
const mongoose = require('mongoose');

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI);
app.use('/', express.static('public'))

//mongoose.connect('mongodb://127.0.0.1:27017/food');

const Product = mongoose.model('Product', {
  name: String,
  image: String,
  ingredients: [String],
  description: String
});
//#endregion

app.get('/', (req, res) => {
  res.send('22 backend')
}
)

app.get('/api/product', async (req, res) => {
  
  const newProduct = new Product({ 
    name: "Miešané vajíčka s bazalkou1",
    image: 'https://i.postimg.cc/wxhjK48B/photo4.jpg',
    ingredients: [
      '1 lyžička maslo',
      '2 ks vajcia',
      '1 hrsť bazalka',
      '1 - 3 štipka soľ'
    ],
    description: "Tento recept na miešané vajcia s bazalkou je veľmi jednoduchý.",
   });


  // res.json({
  //   name: "Miešané vajíčka s bazalkou",
  //   image: 'https://i.postimg.cc/wxhjK48B/photo4.jpg',
  //   ingredients: [
  //     '1 lyžička maslo',
  //     '2 ks vajcia',
  //     '1 hrsť bazalka',
  //     '1 - 3 štipka soľ'
  //   ],
  //   description: "Tento recept na miešané vajcia s bazalkou je veľmi jednoduchý.",
  // })
  await   newProduct.save().then(() => console.log('Add Ok!'));
  res.json(newProduct);

  // let allProducts = await Product.find()
  // res.json(allProducts);

}) //http://localhost:2000/api/product
//{"name":"Омлет","desc":"Вкусный обед"}

app.get('/api/products', async (req, res) => {
  let allProducts = await Product.find()
  res.json(allProducts);

})
app.post('/api/products', async (req, res) => {

  let product = req.body
  if(!product._id ) product._id = new mongoose.Types.ObjectId().toString()
  //если нет такого id создать, есть -  изменить, для этого: {upsert: true})
  //не забыть передать на фронтенд ud
  await Product.findByIdAndUpdate(product._id, product, {upsert: true}) //
  res.json({'status': true});
  console.log(`${req.body}`);
})
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})