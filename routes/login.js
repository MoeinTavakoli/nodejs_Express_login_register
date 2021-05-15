const express = require("express");
const app = express();
const controller = require("../controllers/user/login");
const validator = require("./schema/login");

app.post("/signup", validator.signup, controller.signup);
app.post("/login", validator.login, controller.login);

module.exports = app;
