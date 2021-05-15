const jwt = require("../jwt/jwt");
const { StatusCodes } = require("http-status-codes");
async function check(req, res, next) {
  const verifyUser = jwt.verifyToken(req.headers.authorization);
  if (verifyUser) {
    req.userID = verifyUser.ID;
    next();
  } else {
    res
      .status(502)
      .json({ success: false, massage: "invalid Token (Expired)" });
  }
}

/*async function joiVerify(req, res, next) {
  const { name, username, password } = req.body;
  const joiValidatorStatus = (
    name,
    username,
    password,
    joi.schema
  );
  if (joiValidatorStatus) {
    next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, massage: "joi is not validate" });
  }
}
*/
module.exports = {
  check,
};
