// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Stock model
const Stock = require("./models/stock.js");
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// server.js

// GET /
// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// server.js

// GET /stocks/new
// server.js

// GET /stocks/new
app.get("/stocks/new", (req, res) => {
  res.render("stocks/new.ejs");
});

// server.js

// POST /stocks

// server.js

// POST /stocks
app.post("/stocks", async (req, res) => {
  if (req.body.buy === "on") {
    req.body.buy = true;
  } else {
    req.body.buy = false;
  }
  const newStock = await Stock.create(req.body);
  // console.log(newStock)
  res.redirect("/stocks/new");
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

