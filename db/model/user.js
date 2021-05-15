const e = require("express");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeConnection = require("../mysql-connection");

class User extends Model {}
User.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
  },
  {
    sequelize: sequelizeConnection,
    sequelizeConnection: "users",
  }
);

async function createUser(name, username, password) {
  const userData = { name: name, username: username, password: password };
  return await User.create(userData);
}

async function deleteUser(username, password) {
  return await User.destroy({
    where: {
      username: username,
      password: password,
    },
  });
}

async function userIsExist(username) {
  return await User.findOne({
    where: {
      username: username,
    },
  });
}

async function checkLogin(username, password) {
  const user = await User.findOne({
    where: {
      username: username,
      password: password,
    },
  });
  if (!user) {
    return true;
  }
  return user;
}

async function returnUserID(username) {
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  return user.ID;
}

async function updatePassword(oldPassword, newPassword, username) {
  return await User.update(
    { password: newPassword },
    {
      where: {
        username: username,
        password: oldPassword,
      },
    }
  );
}

module.exports = {
  createUser,
  deleteUser,
  userIsExist,
  checkLogin,
  returnUserID,
  updatePassword,
};
