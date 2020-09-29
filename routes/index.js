const express = require("express");

// import routers for different functionalities
const userRouter = require("./user");
const mediaRouter = require("./media");
const postRouter = require("./post");
const commentRouter = require("./comment");

const router = express.Router();

// routes for different functionalities
router.use("/media", mediaRouter);

router.use("/user", userRouter);

router.use("/post", postRouter);

router.use("/comment", commentRouter);

/* GET home page. */
router.get("/", (req, res) => {
  res.send("this is the backend!");
});

// export router
module.exports = router;
