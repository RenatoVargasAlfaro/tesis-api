const config = require("../config/config");
const jwt = require("jsonwebtoken");

const AuthenticateUser = {};

/*
  Validate if token is valid
*/
AuthenticateUser.isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            succes: false,
            message: "Forbidden access token not provided"
        });
    }

    // Get token string from Bearer token
    const token = req.headers.authorization.split(" ")[1];

    // Validate if token exist
    if (token) {
        // Validate if token is valid
        jwt.verify(token, config.USER_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    succes: false,
                    message: "Failed authentication token does not exist"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
};

module.exports = AuthenticateUser;