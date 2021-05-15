const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const signupSchema = Joi.object({
  name: Joi.string().trim().min(4).max(100).required(),
  username: Joi.string().trim().min(3).max(30).alphanum().required(),
  password: Joi.string()
    .min(5)
    .trim()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

async function signupSchemaVerify(req, res, next) {
  const {error} = signupSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, massage:error.details});
  }
  return next();
}

module.exports = signupSchemaVerify;
