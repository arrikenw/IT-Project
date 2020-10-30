const express = require("express");

const router = express.Router();
const { authenticateToken } = require("../utils/jwtTokens");
const mediaController = require("../controllers/media");

router.post("/", authenticateToken, (req, res) => {
  console.log("getting media");
  mediaController.serveMedia(req, res);
});


//does not require token - anyone can attempt to fetch public media
router.post("/getPublic", (req, res) => {
  console.log("getting public media");
  mediaController.serveMediaPublic(req, res);
});

router.post("/add", authenticateToken, (req, res) => {
  console.log("posting media");
  mediaController.uploadMedia(req, res);
});

router.post("/update", authenticateToken, (req, res) => {
  console.log("updating media");
  mediaController.updateMediaData(req, res);
});

router.post("/delete", authenticateToken, (req, res) => {
  console.log("deleting media");
  mediaController.deleteMedia(req, res);
});

module.exports = router;
