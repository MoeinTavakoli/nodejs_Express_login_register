const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().trim().min(4).max(100).required(),
  username: Joi.string().trim().min(3).max(30).alphanum().required(),
  password: Joi.string()
    .min(5)
    .trim()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});








  


module.exports= {
    signupSchema,
    loginSchema,
    updatePasswordSchema,
    creatSchema,
    deleteSchema,
    updateNoteSchema,
}