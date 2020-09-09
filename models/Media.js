const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//schema for media content
const MediaSchema = new Schema({
    mediaType: {type: String, enum: ['image', 'audio', 'text', 'video', 'application'], required: true},
    mediaURL: {type: String, required: true},
    filePath: {type: String, required: true}, //entire path excluding the user hash eg. if s3 stores as fakeuserhash/file.txt, path is file.txt
    tags: [String],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    isPrivate: { type: Boolean, required: true },
    canAccess: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true, collection: "Media" }
);

// export model
mongoose.model("media", MediaSchema);
