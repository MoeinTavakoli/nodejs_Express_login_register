const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const updateNoteSchema = Joi.object({
  title: Joi.string().trim().min(4).max(1000).required(),
  noteID: Joi.number().integer().required(),
});

async function updateNoteValidate(req, res, next) {
  const { error } = updateNoteSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, massage: error.details });
  }
  return next();
}

module.exports = updateNoteValidate;
