const mongoose = require("mongoose");

const PostModel = mongoose.model("posts");

const addComment = (req, res) => {
  const { id } = req.user;

  // checks if request has all required attributes to add a comment
  if (!req.body.postID || !req.body.comment) {
    console.log("addComment not successful: missing form attributes");
    res.status(400);
    res.send("Add comment not successful - missing form attributes");
    return;
  }

  const { postID } = req.body;

  // creates payload for creating a comment
  const payload = {
    userID: id,
    comment: req.body.comment,
    likedBy: [],
  };

  PostModel.updateOne({ _id: postID }, { $push: { comments: payload } })
    .then((response) => {
      if (response.n === 1) {
        console.log(`addComment successful: added comment to post ${postID}`);
        res.status(201);
        res.send({ postID });
      } else {
        console.log(`addComment not successful: post ${postID} not found`);
        res.status(400);
        res.send("Add comment not successful - could not find post");
      }
    })
    .catch((err) => {
      console.log(`addComment not successful: ${err.message}`);
      res.status(500);
      res.send("Add comment not successful - something went wrong, try again");
    });
};

const updateComment = (req, res) => {
  const { id } = req.user;

  // checks if request has all required attributes to update a comment
  if (!req.body.postID || !req.body.commentID || !req.body.comment) {
    console.log("updateComment not successful: missing form attributes");
    res.status(400);
    res.send("Update comment not successful - missing form attributes");
    return;
  }

  const { postID, commentID, comment } = req.body;

  PostModel.updateOne(
    { _id: postID, "comments._id": commentID, "comments.userID": id },
    { $set: { "comments.$.comment": comment } }
  )
    .then((response) => {
      if (response.n === 1) {
        console.log(`updateComment successful: updated comment  ${commentID}`);
        res.status(200);
        res.send({ commentID });
      } else {
        console.log(
          `updateComment not successful: comment ${commentID} not found`
        );
        res.status(400);
        res.send("Add comment not successful - could not find comment");
      }
    })
    .catch((err) => {
      console.log(`updateComment not successful: ${err.message}`);
      res.status(500);
      res.send("Add comment not successful - something went wrong, try again");
    });
};

const deleteComment = (req, res) => {
  const { id } = req.user;

  // checks if request has all required attributes to delete a comment
  if (!req.body.postID || !req.body.commentID) {
    console.log("deleteComment not successful: missing form attributes");
    res.status(400);
    res.send("Delete comment not successful - missing form attributes");
    return;
  }

  const { postID, commentID } = req.body;

  PostModel.updateOne(
    { _id: postID, "comments._id": commentID, "comments.userID": id },
    { $pull: { comments: { _id: commentID } } }
  )
    .then((response) => {
      if (response.n === 1) {
        console.log(`deleteComment successful: updated comment  ${commentID}`);
        res.status(200);
        res.send({ commentID });
      } else {
        console.log(
          `deleteComment not successful: comment ${commentID} not found`
        );
        res.status(400);
        res.send("Delete comment not successful - could not find comment");
      }
    })
    .catch((err) => {
      console.log(`deleteComment not successful: ${err.message}`);
      res.status(500);
      res.send(
        "Delete comment not successful - something went wrong, try again"
      );
    });
};

const likeComment = (req, res) => {
  const { id } = req.user;

  // checks if request has all required attributes to like a comment
  if (!req.body.postID || !req.body.commentID) {
    console.log("likeComment not successful: missing form attributes");
    res.status(400);
    res.send("Like comment not successful - missing form attributes");
    return;
  }

  const { postID, commentID } = req.body;

  PostModel.updateOne(
    { _id: postID, "comments._id": commentID},
    { $addToSet: { "comments.$.likedBy": id } }
  )
    .then((response) => {
      if (response.n === 1) {
        console.log(`Like comment successful: updated comment  ${commentID}`);
        res.status(200);
        res.send({ commentID });
      } else {
        console.log(
          `likeComment not successful: comment ${commentID} not found`
        );
        res.status(400);
        res.send("Like comment not successful - could not find comment");
      }
    })
    .catch((err) => {
      console.log(`likeComment not successful: ${err.message}`);
      res.status(500);
      res.send("Like comment not successful - something went wrong, try again");
    });
};

const unlikeComment = (req, res) => {
  const { id } = req.user;

  // checks if request has all required attributes to unlike a comment
  if (!req.body.postID || !req.body.commentID) {
    console.log("unlikeComment not successful: missing form attributes");
    res.status(400);
    res.send("Unlike comment not successful - missing form attributes");
    return;
  }

  const { postID, commentID } = req.body;

  PostModel.updateOne(
    { _id: postID, "comments._id": commentID},
    { $pull: { "comments.$.likedBy": id } }
  )
    .then((response) => {
      if (response.n === 1) {
        console.log(`Unlike comment successful: updated comment  ${commentID}`);
        res.status(200);
        res.send({ commentID });
      } else {
        console.log(
          `unlikeComment not successful: comment ${commentID} not found`
        );
        res.status(400);
        res.send("Unlike comment not successful - could not find comment");
      }
    })
    .catch((err) => {
      console.log(`unlikeComment not successful: ${err.message}`);
      res.status(500);
      res.send(
        "Unlike comment not successful - something went wrong, try again"
      );
    });
};

module.exports.addComment = addComment;
module.exports.updateComment = updateComment;
module.exports.likeComment = likeComment;
module.exports.unlikeComment = unlikeComment;
module.exports.deleteComment = deleteComment;
