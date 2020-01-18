const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router();

let Todo = require('./todo.model');

let Price = require('./bitcoin.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB Todos database connection established successfully")
})

// Using node.JS to make HTTP request to Coinbase API

var request = require('request');

//   function capturePrices () {
// handler = code = start of callback, only needs to be defined once
app.get('/prices', function(req, res){
    // req.body console logs empty object
    let price = new Price();

    // console.log(req.body)
    request({
        method: 'GET',
        uri: 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
        json: true
      }, function (error, response, body){
        if(!error && response.statusCode == 200){
          let currentPrice = body.data.amount
          price.price = currentPrice;
          price.save()
        }
      })
  });
// }

function getBTCPrices () {

    request({
        method: 'GET',
        uri: 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
        json: true
      }, function (error, response, body){
        if(!error && response.statusCode == 200){
          let price = new Price();
          let currentPrice = body.data.amount
          price.price = currentPrice;
          price.save()
        //   console.log(body.data.amount)
        }
      })
}

setInterval(getBTCPrices, 60000);
    

//   app.post('/addPrices', function(req,res) {
//       let price = new Price(req.body.data.amount);

//       request({
//         method: 'POST',
//         uri: 'https://api.coinbase.com/v2/prices/BTC-USD/spot'
//       }, function (error, response, body){
//         if(!error && response.statusCode == 200){
//          price.save()
//     .then (price => {
//         res.status(200).json({'price': 'price added successfully'});
//     })
//     .catch(err => {
//         res.status(400).send('adding new price failed');
//     })
//         }
//       })
//   })




// app.use('/prices', todoRoutes)

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

module.exports = app;