const {
  Op,
  Sequelize,
  DataTypes,
  Model,
  QueryTypes,
  json,
} = require("sequelize");
const sequelizeConnection = require("../mysql-connection");

class Note extends Model {}
Note.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    sequelize: sequelizeConnection,
    sequelizeConnection: "notes",
  }
);

async function createNote(title, userID) {
  const noteData = { title, userID };
  return await Note.create(noteData, { raw: true });
}

async function readNote(userID) {
  return await Note.findAll({
    raw: true,
    where: {
      userID: userID,
    },
  });
}

async function updateNote(userID, noteID, title) {
  return await Note.update(
    { title: title },
    {
      where: { ID: noteID, userID: userID },
    }
  );
}

async function deleteNote(noteID,userID) {
  return await Note.destroy({
    where: {
      ID: noteID,
      userID: userID
    },
  });
}

module.exports = {
  createNote,
  deleteNote,
  readNote,
  updateNote,
};
