const express = require("express");

const router = express.Router();
const { authenticateToken } = require("../utils/jwtTokens");
const mediaController = require("../controllers/media");

router.get("/", authenticateToken, (req, res) => {
  console.log("getting media");
  mediaController.serveMedia(req, res);
});

router.post("/add", authenticateToken, (req, res) => {
  console.log("posting");
  mediaController.uploadMedia(req, res);
});

module.exports = router;