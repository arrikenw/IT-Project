const express = require('express');
const router = express.Router();
const { generateToken, authenticateToken } = require("../utils/jwtTokens");
const userController = require('../controllers/user');

//get a user's details using their authentication token
router.get('/get', authenticateToken, (req, res, next) => {
    userController.getUser(req, res, next);
});

//get a list of user's public details
router.post('/getPublic', (req, res, next) => {
    userController.getPublicUser(req, res, next);
});

//add a new user to the database
router.post('/add', (req, res, next) => {
    userController.addUser(req, res, next);
});

//get a valid authentication token from a user's login details
router.post('/login', (req, res, next) => {
    userController.loginUser(req, res, next);
});

//update a user's details using their authentication token and password
router.post('/update', authenticateToken, (req, res, next) => {
    userController.updateUser(req, res, next);
});

//delete a user's details using their authentication token and password
router.post('/delete', authenticateToken, (req, res, next) => {
    userController.deleteUser(req, res, next);
});


//export router for use index.js
module.exports = router;