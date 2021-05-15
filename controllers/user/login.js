const userModel = require("../../db/model/user");
const jwt = require("../../services/jwt/jwt");
const { StatusCodes } = require("http-status-codes");

async function signup(req, res, next) {
  try {
    const { name, username, password } = req.body;
    const userExist = await userModel.userIsExist(username);
    if (userExist) {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, massage: "User is exist" });
    }
    const result = await userModel.createUser(name, username, password);
    if (!result) {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, massage: "creat fail" });
    }
    res.status(StatusCodes.CREATED).json({
      success: true,
      massage: result,
      token: jwt.generateExpirationToken(username, result.ID),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const userEmptyStatus = await userModel.userIsExist(username);

    if (!userEmptyStatus) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, massage: "User Not found !!!" });
    }
    const { ID } = await userModel.checkLogin(username, password);
    if (!ID) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, massage: "Email OR password is not correct" });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      Token: jwt.generateExpirationToken(username, ID),
    });
  }
  catch(err){
    console.error(err)
    next(err)
  }
}

module.exports = {
  signup,
  login,
};
