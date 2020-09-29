// from https://medium.com/@therealchrisrutherford/nodejs-authentication-with-passport-and-jwt-in-express-3820e256054f
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserModel = mongoose.model("users");

const SECRET = process.env.SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "6h" });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("Authorization error: no token given");
    return res.sendStatus(401); // if there isn't any token
  }

  return jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      console.log("Authentication error: invalid authentication token");
      return res.sendStatus(403);
    }
    // eslint-disable-next-line consistent-return
    return UserModel.findById(user.id)
      .then((response) => {
        if (!response) {
          console.log("Authentication error: user does not exist");
          return res.sendStatus(403);
        }
        req.user = user;
        return next(); // pass the execution off to whatever request the client intended
      })
      .catch((error) => {
        console.log(`Authentication error: ${error.message}`);
        return res.sendStatus(403);
      });
  });
};

module.exports.generateToken = generateToken;
module.exports.authenticateToken = authenticateToken;
