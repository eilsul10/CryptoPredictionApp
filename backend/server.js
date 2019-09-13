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
        //   res.send(body.data.amount);

          console.log("hello")
        }
      })
  });

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


// Add endpoint which retrieves a todo item by providing an ID
todoRoutes.route('/:id').get(function(req,res){
    // URL parameter id is accepted which can be accessed via req.params.id
    let id = req.params.id;
    // This id is passed into the call of Todo.findbyId to retrieve an issue item based on its ID.
    Todo.findById(id, function(err,todo){
        // Once the todo object is available, it is attached to the HTTP response in JSON format
        res.json(todo);
    });
})

// Add route that is needed to be able to add new todo items by sending a HTTP post request(/add)

todoRoutes.route('/add').post(function(req,res) {
    // Able to access new todo item that is part of HTTP POST request body. Access it via req.body and create new instance of Todo
    let todo = new Todo(req.body);
    // New item is saved to the database by calling the save method
    todo.save()
    .then (todo => {
        res.status(200).json({'todo': 'todo added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new todo failed');
    })
})

// Add route to update existing todo item (ex. setting todo_completed to true)

todoRoutes.route('/update/:id').post(function(req,res) {
    // this path contains id parameter
    // inside the callback function passed into call of post, first retrieve the old todo item from the database based on id
    // Once the todo item is retrieved, we're setting the todo property values to what's available in the request body
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).sendStatus("data is not found")
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    })
})

app.use('/todos', todoRoutes);

// app.use('/prices', todoRoutes)

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});