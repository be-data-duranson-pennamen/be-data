const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("plane", {
    numPlane : sequelize.INTEGER,
    type : sequelize.STRING,
    capacity : sequelize.INTEGER,


});