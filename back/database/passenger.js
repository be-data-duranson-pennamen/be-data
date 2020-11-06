const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("passenger", {
    numero : sequelize.INTEGER,
    firstName : sequelize.STRING,
    lastName : sequelize.STRING,
    address : sequelize.STRING
});