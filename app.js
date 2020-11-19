// code reused from web information technology project code
const express = require("express");
const path = require("path");
const cors = require("cors");

// get correct environmental variables
const env = require("./utils/env");

env.setEnv();

require("./models");

// import index router
const routes = require("./routes/index");

// create express app
const app = express();

// json and urlencoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// router all traffic to index router
app.use(
  "/api",
  (req, res, next) => {
    const requestString = `********************* ${req.method} request to path ${req.path} `;
    console.log(requestString.padEnd(79, "*"));
    next();
  },
  routes
);

// The formidable library cannot properly handle some errors - a failure in formidable will not be caught with try/catch
// to protect our server from crashing, we have had to implement this ugly error catching
process.on("uncaughtException", function (err) {
  console.log(`Uncaught exception - most likely from formidable: ${err}`);
});

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  console.log(`Environment: ${process.env.NODE_ENV}`);
}

module.exports = app;
