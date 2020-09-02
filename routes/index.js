const express = require('express');
const router = express.Router();

const userRouter = require('./user');

router.use("/user", userRouter);


/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("this is the backend!");
});



module.exports = router;
