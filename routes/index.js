const express = require("express");

const router = express.Router();

const mediaRouter = require("./media");

router.use("/media", mediaRouter);
const userRouter = require("./user");

router.use("/user", userRouter);

/* GET home page. */
router.get("/", (req, res) => {
  res.send("this is the backend!");
});




//routes to required routers


module.exports = router;
