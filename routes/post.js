const express = require("express");

const router = express.Router();
const { authenticateToken } = require("../utils/jwtTokens");
const postController = require("../controllers/post");

// allows an authorised user to get posts using their authentication token
router.get("/get", authenticateToken, (req, res) => {
  postController.getPost(req, res);
});

// allows users to get posts which have no privacy
router.post("/getPublic", (req, res) => {
  postController.getPublicPost(req, res);
});

// allows an authorised user to add a post using their authentication token
router.post("/add", authenticateToken, (req, res) => {
  postController.addPost(req, res);
});

// allows an authorised user to update a post using their authentication token
router.post("/update", authenticateToken, (req, res) => {
  postController.updatePost(req, res);
});

// allows an authorised user to delete a post using their authentication token
router.post("/delete", authenticateToken, (req, res) => {
  postController.deletePost(req, res);
});

//  allows a user to like a post using their authentication token
router.post("/like", authenticateToken, (req, res) => {
  postController.likePost(req, res);
});

// allows a user to remove their like from a post using their authentication token
router.post("/unlike", authenticateToken, (req, res) => {
  postController.unlikePost(req, res);
});

// export router for use index.js
module.exports = router;
