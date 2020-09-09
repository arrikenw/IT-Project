// import packages
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const mongoose = require("mongoose");
const { generateToken } = require("../utils/jwtTokens");

// import the users model
const UserModel = mongoose.model("users");

// get a user's private user information
// must be authenticated first
const getUser = (req, res) => {
  const { id } = req.user;

  // find user by id
  UserModel.findById(id)
    .lean()
    .then((doc) => {
      // send user data back
      const payload = doc;
      delete payload.password;
      delete payload.updatedAt;
      delete payload.createdAt;
      delete payload.__v;
      console.log(`getUser successful: found user with id ${id}`);
      res.status(200);
      res.send(doc);
    })
    .catch((err) => {
      console.log(`getUser not successful: ${err.message}`);
      res.status(500);
      res.send("Get user not successful- something went wrong, try again");
    });
};

// gets a list of user's public user information
const getPublicUser = (req, res) => {
  if (!req.body.ids) {
    console.log("getPublicUser not successful: missing forum attributes");
    res.status(400);
    res.send("Get public user not successful - missing forum attributes");
    return;
  }

  const processUsers = (err, docs) => {
    if (err) {
      res.status(500);
      console.log(`getPublicUser not successful: ${err.message}`);
      res.send(
        "Get public user not successful - something went wrong, try again"
      );
      return;
    }

    const payload = JSON.parse(JSON.stringify(docs));

    for (let i = 0; i < payload.length; i += 1) {
      delete payload[i].email;
      delete payload[i].password;
      delete payload[i].createdAt;
      delete payload[i].updatedAt;
      delete payload[i].role;
      delete payload[i].__v;
    }

    console.log(`getPublicUser successful: returned ${payload.length} users`);
    res.status(200);
    res.send(payload);
  };

  UserModel.find().where("_id").in(req.body.ids).exec(processUsers);
};

// adds a new user to the database
const addUser = (req, res) => {
  // checks if request has all required attributes to add a user
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.userName
  ) {
    console.log("addUser not successful: missing forum attributes");
    res.status(400);
    res.send("Sign up failed - missing forum attributes");
    return;
  }

  // checks if password is greater than 8 characters
  if (req.body.password.length < 8) {
    console.log("addUser not successful: password less than 8 characters");
    res.status(400);
    res.send("Sign up failed - password must be greater than 8 characters");
    return;
  }

  // checks if password is less than or equal to 80 characters
  if (req.body.password.length > 80) {
    console.log("addUser not successful: password greater than 80 characters");
    res.status(400);
    res.send(
      "Sign up failed - password must be less than or equal to 80 characters"
    );
    return;
  }

  // checks if email address is valid
  if (!emailValidator.validate(req.body.email)) {
    console.log("addUser not successful: invalid email");
    res.status(400);
    res.send("Sign up failed - invalid email address");
    return;
  }

  // callback after saving new user to database
  const onUserSave = (err, newUser) => {
    // catch different errors
    if (err) {
      if (
        err.message.startsWith(
          "E11000 duplicate key error collection: developmentDB.Users index: email_1"
        )
      ) {
        console.log(
          "addUser not successful: email address already has an account"
        );
        res.status(400);
        res.send("Sign up failed - email address already has an account");
        return;
      }
      // TODO Handle different errors

      res.status(500);
      console.log(`addUser not successful: ${err.message}`);
      res.send("Sign up failed - something went wrong, try again");
      return;
    }
    console.log(`addUser successful: ${newUser.email}`);
    res.status(201);
    res.send(`Sign up successful - account made with id ${newUser._id}`);
  };

  // callback after hashing password
  const saveUser = (err, hash) => {
    if (err) {
      console.log(`addUser not successful: ${err.message}`);
      res.status(500);
      res.send("Sign up failed - something went wrong, try again");
      return;
    }
    const item = req.body;
    item.password = hash;
    const data = new UserModel(item);
    data.save(onUserSave);
  };

  // hash password
  bcrypt.hash(req.body.password, 12, saveUser);
};

// return an access token for a given user
const loginUser = (req, res) => {
  // if user details are missing
  if (!req.body.email || !req.body.password) {
    console.log("loginUser not successful: missing forum attributes");
    res.status(400);
    res.send("Login not successful - missing forum attributes");
    return;
  }

  let user = "";

  // callback on validated password
  const validatePassword = (err, valid) => {
    if (err) {
      console.log(`loginUser not successful: ${err.message}`);
      res.status(500);
      res.send("Login not successful - something went wrong, try again");
    }
    if (valid) {
      const payload = {
        id: user._id,
      };
      console.log(`loginUser successful: id ${user._id}`);
      res.status(200);
      res.send({ token: generateToken(payload) });
    } else {
      console.log(
        `loginUser not successful: invalid password for user ${user._id}`
      );
      res.status(400);
      res.send("Login user failed - invalid password");
    }
  };

  // callback on found user
  const validateAccount = (err, docs) => {
    if (docs.length === 0) {
      console.log(
        `loginUser not successful: no account exists with email: ${req.body.email}`
      );
      res.status(400);
      res.send(
        `Login user failed - no account exists with email: ${req.body.email}`
      );
      return;
    }
    if (err) {
      console.log(`loginUser not successful: ${err.message}`);
      res.status(500);
      res.send("Login not successful - something went wrong, try again");
      return;
    }
    user = docs[0];
    bcrypt.compare(req.body.password, user.password, validatePassword);
  };

  // find user with matching email
  UserModel.find({ email: req.body.email }, validateAccount);
};

// update a user's information
const updateUser = (req, res) => {
  const { id } = req.user;
  const update = JSON.parse(JSON.stringify(req.body.update));

  const onUpdateUser = (err, results) => {
    if (err) {
      console.log(`updateUser not successful: ${err.message}`);
      res.status(500);
      res.send("update not successful - something went wrong, try again");
      return;
    }
    if (results.n === 1) {
      console.log(`updateUser successful: updated user ${id}`);
      res.status(200);
      res.send(`update successful - updated user ${id}`);
      return;
    }
    console.log(`updateUser not successful: could not find user ${id}`);
    res.status(400);
    res.send(`update not successful - could not find user ${id}`);
  };

  const onHashPassword = (err, hash) => {
    if (err) {
      console.log(`updateUser not successful: ${err.message}`);
      res.status(500);
      res.send("update not successful - something went wrong, try again");
      return;
    }
    update.password = hash;
    UserModel.updateOne({ _id: id }, update, onUpdateUser);
  };

  const onCheckPassword = (err, valid) => {
    if (err) {
      console.log(`updateUser not successful: ${err.message}`);
      res.status(500);
      res.send("update not successful - something went wrong, try again");
      return;
    }
    if (valid) {
      if (update.password) {
        bcrypt.hash(update.password, 12, onHashPassword);
      } else {
        UserModel.updateOne({ _id: id }, update, onUpdateUser);
      }
    } else {
      console.log(`updateUser not successful: invalid password for user ${id}`);
      res.status(400);
      res.send("Update not successful - invalid password");
    }
  };

  // find user by id
  UserModel.findById(id)
    .lean()
    .then((doc) => {
      bcrypt.compare(req.body.password, doc.password, onCheckPassword);
    })
    .catch((err) => {
      console.log(`updateUser not successful: ${err.message}`);
      res.status(500);
      res.send("Update not successful - something went wrong, try again");
    });
};

// delete a user from the database
const deleteUser = (req, res) => {
  const { id } = req.user;

  const onDeleteUser = (err, results) => {
    if (err) {
      console.log(`deleteUser not successful: ${err.message}`);
      res.status(500);
      res.send("Delete not successful - something went wrong, try again");
      return;
    }
    if (results.n === 1) {
      console.log(`deleteUser successful: updated user ${id}`);
      res.status(200);
      res.send(`Delete successful - updated user ${id}`);
      return;
    }
    console.log(`deleteUser not successful: could not find user ${id}`);
    res.status(400);
    res.send(`Delete not successful - could not find user ${id}`);
  };

  const onCheckPassword = (err, valid) => {
    if (err) {
      console.log(`deleteUser not successful: ${err.message}`);
      res.status(500);
      res.send("Delete not successful - something went wrong, try again");
      return;
    }
    if (valid) {
      UserModel.deleteOne({ _id: id }, onDeleteUser);
    } else {
      console.log(`deleteUser not successful: invalid password for user ${id}`);
      res.status(400);
      res.send("Delete not successful - invalid password");
    }
  };

  // find user by id
  UserModel.findById(id)
    .lean()
    .then((doc) => {
      bcrypt.compare(req.body.password, doc.password, onCheckPassword);
    })
    .catch((err) => {
      console.log(`deleteUser not successful: ${err.message}`);
      res.status(500);
      res.send("Delete not successful - something went wrong, try again");
    });
};

module.exports.getUser = getUser;
module.exports.getPublicUser = getPublicUser;
module.exports.addUser = addUser;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
