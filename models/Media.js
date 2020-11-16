const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema for media content
const MediaSchema = new Schema(
  {
    mimeType: { type: String, maxLength: 25, required: true },
    contentCategory: {
      type: String,
      enum: ["image", "audio", "text", "video", "application"],
      required: true,
    },
    extension: { type: String, maxLength: 6, required: true },
    givenFileName: { type: String, required: true, maxLength: 2000 },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    isPrivate: { type: Boolean, required: true },
    canAccess: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true, collection: "Media" }
);

// export model
mongoose.model("media", MediaSchema);
