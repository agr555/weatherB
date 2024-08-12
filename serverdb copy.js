const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');//create db or/and connect

const Cat = mongoose.model('Cat', { name: String }); // create table and/or open

const kitty = new Cat({ name: 'Zildjian' }); //add record
kitty.save().then(() => console.log('meow')); //commit