const mongoose = require("mongoose");
const comment = require("./Comment");

const Schema = mongoose.Schema;

// schema for posts
const postSchema = new Schema(
  {
    title: { type: String, maxLength: 200, required: true },
    description: { type: String, maxLength: 2200 },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    mediaID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "media",
    },
    thumbnailURL: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "media",
      required: true,
    },
    contentCategory: { type: String, maxLength: "20", required: true },
    comments: [comment],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    private: { type: Boolean, require: true, default: false },
    userIsPrivate: { type: Boolean, require: true, default: false}
  },
  { timestamps: true, collection: "Posts" }
);

// export model
mongoose.model("posts", postSchema);
