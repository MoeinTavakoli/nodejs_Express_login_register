const userModel = require("../../db/model/user");
const jwt = require("../../services/jwt/jwt");
const { StatusCodes } = require("http-status-codes");

async function update(req, res, next) {
  try {
    const username = jwt.verifyToken(req.headers.authorization).username;
    const { newPassword, oldPassword } = req.body;
    if (newPassword == oldPassword) {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, massage: "New and old pass is equal !" });
    }

    const updateStatus = await userModel.updatePassword(
      oldPassword,
      newPassword,
      username
    );
    if (updateStatus[1] == 0) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, massage: "update is not complete" });
    }
    res.json({ success: true, Update: updateStatus });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = { update };
