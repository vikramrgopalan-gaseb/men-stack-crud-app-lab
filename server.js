// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require('express');
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Stock model
const Stock = require("./models/stock.js");
// server.js

// GET /
// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
