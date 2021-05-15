const express = require("express");
const app = express();

const port = 3000;

const dbsNameNote = "notebook";
const dbsNameUser = "user";

module.exports = {
  app,
  port,
  dbsNameNote,
  dbsNameUser,
};
