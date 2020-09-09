//code resued from web information technology project code

const express = require('express');
const path = require('path');
const cors = require('cors');

//if not in production environment, require .ENV file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//connect to database and register schemas
require('../models');

//import index router
const routes = require('../routes/index');

//create express app
const server = express();

//json and urlencoded parser
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//enable cors
server.use(cors());

//configure cors to allow any domain
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

//tell express to use the cors-middleware with our specified options
server.use(cors(corsOptions))

//configure route for uploads
const upload = require('./upload')
server.post('/upload', upload)


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

//*****************************************
//Testing DB, can be deleted later
const mongoose = require("mongoose");
const Media = mongoose.model("media");
const mediaitem = {
  mediaType: 'Text',
  mediaURL: '/fake/faketext.txt',
  tags: ['test'],
  creator: '5f4cd968f6b0b12dc8f5afd8',
  isPrivate: false,
  canAccess: []
};
data = new Media(mediaitem);
data.save();
//*****************************************

module.exports = server;
