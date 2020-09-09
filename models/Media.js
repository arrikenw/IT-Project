const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema for media content
const MediaSchema = new Schema(
  {
    mediaType: {
      type: String,
      enum: ["Video", "Sound", "Image", "Text", "Code", "PDF", "Document"],
      required: true,
    },
    mediaURL: { type: String, required: true },
    tags: [String],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    isPrivate: { type: Boolean, required: true },
    canAccess: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true, collection: "Media" }
);

// export model
mongoose.model("media", MediaSchema);
