const jwt = require("../../services/jwt/jwt");
const userModel = require("../../db/model/user");
const noteModel = require("../../db/model/note");
const { StatusCodes } = require("http-status-codes");

async function createNote(req, res, next) {
  try {
    const { title } = req.body;
    const createStatus = await noteModel.createNote(title, req.userID);
    if (!createStatus) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, massage: "create fail" });
    }
    res.json({ success: true, result: createStatus });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function readNote(req, res, next) {
  try {
    const result = await noteModel.readNote(req.userID);
    if (!result) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, massage: "CanT read notes" });
    }
    res.json({ success: true, result: result });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function deleteNote(req, res, next) {
  try {
    const noteID = req.body.noteID;
    const userID = req.userID;
    const result = await noteModel.deleteNote(noteID, userID);
    if (!result) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, massage: "CanT delete notes" });
    }
    res.status(StatusCodes.BAD_REQUEST).json({ success: true, result: result });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function updateNote(req, res, next) {
  // TODO: check login
  try {
    const { title, noteID } = req.body;
    const updateStatus = await noteModel.updateNote(req.userID, noteID, title);
    if (!updateStatus) {
      res.json({ success: false, massage: "update failed" });
    }
    res.json({ success: true, result: updateStatus });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
module.exports = { createNote, deleteNote, readNote, updateNote };
