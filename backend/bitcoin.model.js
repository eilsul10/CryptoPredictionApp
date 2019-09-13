const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Price = new Schema({
    price: {
        type: Number
    }
})

module.exports = mongoose.model('Price', Price);