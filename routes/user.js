const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/test', (req, res, next)=> {
    userController.getUser(req, res, next);
});

router.post('/add', (req, res, next)=> {
    userController.addUser(req, res, next);
});


//export router for use index.js
module.exports = router;