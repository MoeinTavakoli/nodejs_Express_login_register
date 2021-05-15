const jwt = require("jsonwebtoken");
const config = require("../../config");


function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch {
    return false;
  }
}

function decodeToken(token) {
  return jwt.decode(token);
}

function generateExpirationToken(username, userID) {
  const obj = { username: username, ID: userID };
  return jwt.sign(obj, config.jwt.secret, { expiresIn: "20h" });
}

module.exports = {
  verifyToken,
  decodeToken,
  generateExpirationToken,
};
