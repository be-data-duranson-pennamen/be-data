const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("ticket", {
    flightId: sequelize.INTEGER,
    passengerId : sequelize.INTEGER,
});