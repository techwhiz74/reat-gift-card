const jwt = require("jsonwebtoken");

const secretKey = "password";

const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "3600s",
  });
};

module.exports = generateToken;
