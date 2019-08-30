const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Price = new Schema({
    price: {
        type: String
    }
})

module.exports = mongoose.model('Price', Price);