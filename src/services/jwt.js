const jwt = require("jsonwebtoken");
const tokens = require("../config/config");

const JWT = {};

/*
    Create json web token
*/
JWT.createUserToken = user => {
  const payload = user;
  return jwt.sign(payload, tokens.USER_TOKEN);
};

/*
    Get payload from token
*/
JWT.getPayload = bearerToken => {
  let token = bearerToken.split(" ")[1];
  return jwt.decode(token);
};

/*
    Get payload from token
*/
JWT.complete0 = number => {
  let complete = "";

  switch (number.length) {
    case 1:
      complete = "0000" + number;
      break;
    case 2:
      complete = "000" + number;
      break;
    case 3:
      complete = "00" + number;
      break;
    case 4:
      complete = "0" + number;
      break;
    case 5:
      complete = number;
      break;
  }

  return complete;
};

module.exports = JWT;