const sequelize = require("sequelize");
const { db } = require(".");

module.exports = db.define("flight", {
    num : sequelize.INTEGER,
    departureAirport : sequelize.STRING,
    arrivalAirport : sequelize.STRING,
    departureDate : sequelize.DATE,
    arrivalDate : sequelize.DATE,
    pilot1 : sequelize.INTEGER,
    pilot2 : sequelize.INTEGER,
    stewart1 : sequelize.INTEGER,
    stewart2 : sequelize.INTEGER,
    emptyPlaces : sequelize.INTEGER,
    numPlane : sequelize.INTEGER,

});