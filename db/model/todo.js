const {
  Op,
  Sequelize,
  DataTypes,
  Model,
  QueryTypes,
  json,
} = require("sequelize");
const sequelizeConnection = require("../mysql-connection");

class Todo extends Model {}
Todo.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["true", "false"]),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    sequelize: sequelizeConnection,
    sequelizeConnection: "todos",
  }
);

async function createTodo(userID, text, status = "false") {
  const todoData = { userID, text, status };
  try {
    return await Todo.create(todoData, { raw: true });
  } catch {
    console.error("create Fail");
  }
}

async function deleteTodo(todoID) {
  try {
    return await Todo.destroy({
      where: { ID: todoID },
    });
  } catch {
    console.error("delete fail");
  }
}

module.exports = {
  createTodo,
  deleteTodo,
};
