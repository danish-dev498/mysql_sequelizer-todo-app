const jwt = require("jsonwebtoken");

exports.verifyToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

exports.createToken = (data) => {
  const expiresIn = 60 * 60 * 24 * 7;
  return jwt.sign({ userId: data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
};
