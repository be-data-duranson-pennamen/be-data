const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("ticket", {
    price : sequelize.INTEGER,
    flightId: sequelize.INTEGER,
    passengerSecuNum : sequelize.INTEGER,


});