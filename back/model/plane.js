const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("plane", {
    type : sequelize.STRING,
    capacity : sequelize.INTEGER,


});