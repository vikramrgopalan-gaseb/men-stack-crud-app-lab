// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const methodOverride = require("method-override");

const app = express();

const port = process.env.PORT ? process.env.PORT : "3000";

const authController = require("./controllers/auth.js");

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Stock model
const Stock = require("./models/stock.js");
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// server.js

// GET /
// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.use("/auth", authController);

// server.js
// GET /stocks
app.get("/stocks", async (req, res) => {
  const allStocks = await Stock.find();
  // console.log(allStocks);
  res.render("stocks/index.ejs", { stocks: allStocks });
});

// GET /stocks/new
// server.js

// GET /stocks/new
app.get("/stocks/new", (req, res) => {
  res.render("stocks/new.ejs");
});

// server.js

app.get("/stocks/:stockId", async (req, res) => {
  const foundStock = await Stock.findById(req.params.stockId);
   res.render("stocks/show.ejs", { stock: foundStock });
});


// POST /stocks

// server.js

// POST /stocks
app.post("/stocks", async (req, res) => {
  const newStock = await Stock.create(req.body);
  // console.log(newStock)
   res.redirect("/stocks");
});


app.delete("/stocks/:stockId", async (req, res) => {
  await Stock.findByIdAndDelete(req.params.stockId);
  res.redirect("/stocks");
});


app.get("/stocks/:stockId/edit", async (req, res) => {
  const foundStock = await Stock.findById(req.params.stockId);
   res.render("stocks/edit.ejs", {
    stock: foundStock,
  });
});

// server.js

app.put("/stocks/:stockId", async (req, res) => {
  // Handle the 'buy' checkbox data
  if (req.body.buy === "on") {
    req.body.buy = true;
  } else {
    req.body.buy = false;
  }
  
  // Update the stock in the database
  await Stock.findByIdAndUpdate(req.params.stockId, req.body);

  // Redirect to the stock's show page to see the updates
  res.redirect(`/stocks/${req.params.stockId}`);
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

