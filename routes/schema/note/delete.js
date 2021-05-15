const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const deleteSchema = Joi.object({
  noteID: Joi.number().integer().required(),
});

async function deleteNoteValidate(req, res, next) {
  const { error } = deleteSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, massage: error.details });
  }
  return next();
}

module.exports = deleteNoteValidate;
