const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const creatSchema = Joi.object({
  title: Joi.string().trim().min(4).max(1000).required(),
});
async function createNoteValidate(req, res, next) {
  const { error } = creatSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, massage:error.details});
  }
  return next();
}

module.exports = createNoteValidate;
