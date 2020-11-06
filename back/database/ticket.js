const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("ticket", {
    num : sequelize.INTEGER,
    date : sequelize.DATE,
    price : sequelize.INTEGER,
    numFlight : sequelize.INTEGER,
    numPassenger : sequelize.INTEGER,


});