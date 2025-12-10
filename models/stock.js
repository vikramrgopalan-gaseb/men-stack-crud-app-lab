// models/stock.js

const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    name: String,
    ticker: String,
    price: Number,
    buy: Boolean,
});

const Stock = mongoose.model("Stock", stockSchema); // create model

// models/stock.js

module.exports = Stock;

