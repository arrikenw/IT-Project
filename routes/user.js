const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/test', (req, res, next)=> {
    userController.getUser(req, res, next);
});

//export router for use index.js
module.exports = router;