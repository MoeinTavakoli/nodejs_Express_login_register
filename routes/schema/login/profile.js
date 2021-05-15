const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .min(5)
    .trim()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  newPassword: Joi.string()
    .min(5)
    .trim()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

async function updatePasswordSchemaVerify(req, res, next) {
  const { error } = updatePasswordSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, massage:error.details});
  }
  return next();
}

module.exports = updatePasswordSchemaVerify;
