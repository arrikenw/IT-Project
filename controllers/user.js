
const getUser = (req, res, next) => {
    res.statusCode(200);
    res.send("this is the users route");
}

module.exports.getUser = getUser;