const express = require('express');
const router = express.Router();
//const { generateToken, authenticateToken } = require("../utils/jwtTokens");
const mediaController = require('../controllers/media');

/*
Waiting on arriken to finish authentication
router.post('/add', authenticateToken, (req, res, next) => {
    mediaController.uploadMedia(req, res, next);
});
*/

router.post('/add', (req, res, next) => {
    console.log("posting");
    mediaController.uploadMedia(req, res, next);
});




module.exports = router;