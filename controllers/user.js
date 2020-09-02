//import packages
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const mongoose = require("mongoose");

//import the users model
const UserModel = mongoose.model("users");

//get a user's private user information
//must be authenticated first
const getUser = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        console.log("AddUser not successful: missing forum attributes");
        //res.statusCode(400);
        res.send("Sign up failed - Missing forum attributes");
        return;
    }
    let user = "";

    const validatePassword = (err, valid) => {
        if (valid) {
            res.send(user);
        }
        else {
            res.send("Get user failed - invalid password");
        }
    }

    const validateAccount = (err, docs) => {
        if (docs.length === 0) {
            res.send("Get user failed - no account exists with email: " + req.body.email);
            return;
        }
        user = docs[0];
        bcrypt.compare(req.body.password, user.password, validatePassword);
        console.log(err);
        console.log(docs);
        return;
    }
    UserModel.find({email: req.body.email}, validateAccount);
}

//gets a user's public user information
const getUserPublic = (req, res, next) => {
    res.statusCode(200);
    res.send("this is the users route");
}

//gets a list of user's public user information
const getUsersPublic = (req, res, next) => {
    res.statusCode(200);
    res.send("this is the users route");
}

//adds a new user to the database
const addUser = (req, res, next) => {

    //checks if request has all required attributes to add a user
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        console.log("AddUser not successful: missing forum attributes");
        //res.statusCode(400);
        res.send("Sign up failed - Missing forum attributes");
        return;
    }

    //checks if password is greater than 8 characters
    else if (req.body.password.length < 8) {
        //res.statusCode(400);
        res.send("Sign up failed - password must be greater than 8 characters");
        return;
    }

    //checks if password is less than or equal to 80 characters
    else if (req.body.password.length > 80) {
        //res.statusCode(400);
        res.send("Sign up failed - password must be less than or equal to 80 characters");
        return;
    }

    //checks if email address is valid
    else if (!emailValidator.validate(req.body.email)) {
        //res.statusCode(400);
        res.send("Sign up failed - invalid email address");
        return;
    }

    else {
        const onUserSave = (err, newUser) => {
            if (err) {
                if (err.message.startsWith("MongoError: E11000 duplicate key error collection: developmentDB.Users index: email_1")) {
                    console.error(err);
                    res.send("Sign up failed - email address already has an account");
                    return;
                }
                //TODO Handle different errors

                //res.statusCode(500);
                console.error(err);
                console.log(err.message);
                console.log("we are here");
                res.send("Sign up failed - something went wrong, try again");
                return;
            }
            console.log("Sign up successful");
            //res.statusCode(200);
            res.send("Sign up successful - account made for email: " + newUser.email);

        }
        const saveUser = (err, hash) => {
            if (err) {
                console.error(err);
                //res.statusCode(500);
                res.send("Sign up failed - something went wrong, try again");
                return;
            }
            const item = req.body;
            item.password = hash;
            const data = new UserModel(item);
            data.save(onUserSave);
        }
        bcrypt.hash(req.body.password, 12, saveUser);
    }
}

//return an access token for a given user
const loginUser = (req, res, next) => {
    res.statusCode(200);
    res.send("this is the users route");
}

//update a user's information
const updateUser = (req, res, next) => {
    res.statusCode(200);
    res.send("this is the users route");
}

//delete a user from the database
const deleteUser = (req, res, next) => {
    res.statusCode(200);
    res.send("this is the users route");
}


module.exports.getUser = getUser;
module.exports.addUser = addUser;