//code resued from web information technology project code

const express = require('express');
const path = require('path');
const cors = require('cors');

//if not in production environment, require .ENV file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//connect to database and register schemas
require('./models');

//import index router
const routes = require('./routes/index');

//create express app
const server = express();

//json and urlencoded parser
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//enable cors
server.use(cors());

//router all traffic to index router
server.use('/api', (req, res, next) => {
  const request_string = "********************* " + req.method + " request to path " + req.path + " ";
  console.log(request_string.padEnd(79, "*"));
  next();
}, routes);

// Serve static files from the React app
if (process.env.ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
  server.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
} else {
  console.log("Environment: " + process.env.ENV);
}

//listen on port
const PORT = process.env.PORT || 3080;
server.listen(PORT, () => {
  console.log(`IT-Project test backend running on port: ${PORT}`);
});

module.exports = server;
