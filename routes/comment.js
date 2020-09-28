const express = require("express");

const router = express.Router();
const { authenticateToken } = require("../utils/jwtTokens");
const commentController = require("../controllers/comment");

// allows an authorised user to add a comment using their authentication token
router.post("/add", authenticateToken, (req, res) => {
  commentController.addComment(req, res);
});

// allows an authorised user to update a comment using their authentication token
router.post("/update", authenticateToken, (req, res) => {
  commentController.updateComment(req, res);
});

// allows an authorised user to delete a comment using their authentication token
router.post("/delete", authenticateToken, (req, res) => {
  commentController.deleteComment(req, res);
});

//  allows a user to like a comment using their authentication token
router.post("/like", authenticateToken, (req, res) => {
  commentController.likeComment(req, res);
});

// allows a user to remove their like from a comment using their authentication token
router.post("/unlike", authenticateToken, (req, res) => {
  commentController.unlikeComment(req, res);
});

// export router for use index.js
module.exports = router;
