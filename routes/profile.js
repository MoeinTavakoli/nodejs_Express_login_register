const express = require("express");
const app = express();
const auth = require('../services/middleware/index')
const  validator = require('./schema/login')
const controller = require("../controllers/user/profile");

app.post("/update-Password",validator.updatePassword, auth.check, controller.update);

module.exports = app;
