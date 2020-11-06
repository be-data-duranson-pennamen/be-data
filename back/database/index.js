require("dotenv").config();
const sequelize = require("sequelize");

module.exports.db = new sequelize(process.env.DATABASE_URL, {
    dialectOptions: { ssl: true },
    logging: false
});

module.exports.Passenger = require("./passenger");
module.exports.Flight = require("./flight");
module.exports.Employee = require("./employee");
module.exports.Plane = require("./plane");
module.exports.Ticket = require("./ticket");