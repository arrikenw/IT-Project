const express = require("express");

const router = express.Router();
const { authenticateToken } = require("../utils/jwtTokens");
const userController = require("../controllers/user");

// get a user's details using their authentication token
router.get("/get", authenticateToken, (req, res) => {
  userController.getUser(req, res);
});

router.post("/getProfilePic", (req, res) => {
  userController.getProfilePic(req, res);
});

// get a list of user's public details
router.post("/getPublic", (req, res) => {
  userController.getPublicUser(req, res);
});

// add a new user to the database
router.post("/add", (req, res) => {
  userController.addUser(req, res);
});

// get a valid authentication token from a user's login details
router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

// update a user's details using their authentication token and password
router.post("/update", authenticateToken, (req, res) => {
  userController.updateUser(req, res);
});

// delete a user's details using their authentication token and password
router.post("/delete", authenticateToken, (req, res) => {
  userController.deleteUser(req, res);
});

// export router for use index.js
module.exports = router;
