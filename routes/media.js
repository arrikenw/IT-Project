const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../utils/jwtTokens");
const mediaController = require('../controllers/media');

router.get('/', authenticateToken, (req, res, next) => {
   console.log('getting media');
    mediaController.serveMedia(req, res, next);
});

router.post('/add', authenticateToken, (req, res, next) => {
    console.log('posting');
    mediaController.uploadMedia(req, res, next);
});




module.exports = router;