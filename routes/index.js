const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is the backend!");
});




//routes to required routers


module.exports = router;
