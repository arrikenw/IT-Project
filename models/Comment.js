const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema for comments
const commentSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comment: { type: String, maxLength: 2200 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true, collection: "Comments" }
);

// export model
module.exports = commentSchema;
