const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
// require("dotenv").config();

const productRoutes = require("./api/routes/products.js");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

// mongoose
//   .connect(
//     `mongodb+srv://amit:+ process.env.MONGO_ATLAS_PW +@ak.htcxw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("connected to DB!"));

mongoose
  .connect(
    `mongodb+srv://amit:amit@ak.htcxw.mongodb.net/db?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to db"));

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methos", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
