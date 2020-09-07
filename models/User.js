const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("email-validator");

//schema for users
//restrictions/validation of email is based on previous work from INFO30005
const userSchema = new Schema({
    email: {type: String, required: true, unique: true, trim: true, minLength: 3, validate: (value) => {
            if (!validator.validate(value)) {
                throw new Error("Invalid Email Address");
            }
        }},
    firstName:  {type: String, required: true, maxLength: 50},
    lastName:  {type: String, required: true, maxLength: 50},
    userName: {type: String, minLength: 1, maxLength: 20, trim: true, unique: true, required: true},
    picURL: {type: String},
    password: {type: String, required: true, minLength: 8, maxLength: 50},
    organization: {type: String},
    professionalFields: [String],
    DOB: {type: Date},
    phone: {type: String}, //research lengths etc. later - this is just initial setup
    bio: {type: String, maxLength: 1000},
    role: {type: String, enum: ["User", "Admin"], default: 'User', required: true},
}, {timestamps: true, collection: 'Users'});

//export model
mongoose.model('users', userSchema);