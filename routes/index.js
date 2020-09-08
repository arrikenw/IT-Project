const express = require('express');
const router = express.Router();

const mediaRouter = require('./media');
router.use('/media', mediaRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is the backend!");
});

module.exports = router;
