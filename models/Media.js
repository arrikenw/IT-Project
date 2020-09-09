const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//schema for media content
const MediaSchema = new Schema({
    mediaType: {type: String, enum: ['image', 'audio', 'text', 'video', 'application'], required: true},
    extension: {type: String, maxLength: 10, required: true},
    name: {type:String, required: true, maxLength: 20},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    isPrivate: { type: Boolean, required: true },
    canAccess: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true, collection: "Media" }
);

// export model
mongoose.model("media", MediaSchema);
