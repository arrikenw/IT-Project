//from https://medium.com/@therealchrisrutherford/nodejs-authentication-with-passport-and-jwt-in-express-3820e256054f
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET

const generateToken  = (payload) => {
    return jwt.sign(payload, SECRET, {expiresIn: '6h'})
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers[`authorization`];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)  {
        console.log("Authorization error: no token given");
        return res.sendStatus(401) // if there isn't any token
    }

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            console.log("Authentication error: invalid authentication token");
            return res.sendStatus(403)
        }
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}

module.exports.generateToken = generateToken;
module.exports.authenticateToken = authenticateToken;
