const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("passenger", {
    firstName : sequelize.STRING,
    lastName : sequelize.STRING,
    address : sequelize.STRING
});