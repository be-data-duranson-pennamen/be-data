const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("employee", {
    secuNum : sequelize.INTEGER,
    firstName : sequelize.STRING,
    lastName : sequelize.STRING,
    address : sequelize.STRING,
    job : sequelize.STRING,
    license : sequelize.INTEGER,
    salary : sequelize.INTEGER,


});