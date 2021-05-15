const express = require("express");
const app = express();
const controller = require("../controllers/note/index");
const auth = require("../services/middleware/index");
const  validator = require('./schema/note')

app.get("/", auth.check, controller.readNote);
app.post("/",validator.creat, auth.check, controller.createNote);
app.patch("/",validator.update, auth.check, controller.updateNote);
app.delete("/",validator.delete, auth.check, controller.deleteNote);

module.exports = app;
