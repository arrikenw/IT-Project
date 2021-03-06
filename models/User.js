const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const validator = require("email-validator");

// schema for users
// restrictions/validation of email is based on previous work from INFO30005
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      validate: (value) => {
        if (!validator.validate(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    userName: {
      type: String,
      minLength: 1,
      maxLength: 20,
      trim: true,
      unique: true,
      required: true,
    },
    profilePic: { type: mongoose.Schema.Types.ObjectId },
    pinnedPosts: [{ type: mongoose.Schema.Types.ObjectID, ref: "Posts" }], // idk if should be "posts" or "Posts"
    password: { type: String, required: true, minLength: 8, maxLength: 50 },
    organisation: { type: String },
    tags: [{ type: String, maxLength: 5 }],
    professionalFields: [{ type: String, maxLength: 5 }],
    dateOfBirth: { type: Date },
    phoneNumber: { type: String }, // research lengths etc. later - this is just initial setup
    biography: { type: String, maxLength: 1000 },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
      required: true,
    },
    private: { type: Boolean, required: true, default: false },
    phoneNumberPrivate: { type: Boolean, required: true, default: true },
    emailPrivate: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, collection: "Users" }
);

// export model
mongoose.model("users", userSchema);
