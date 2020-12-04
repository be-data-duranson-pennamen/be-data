require("dotenv").config();
const sequelize = require("sequelize");

module.exports.db = new sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
const Passenger = require("./passenger");
const Flight = require("./flight");
const Ticket = require("./ticket");

Flight.hasMany(Ticket, {foreignKey: 'flightId'})
Ticket.belongsTo(Flight, {foreignKey: 'flightId'})
Passenger.hasMany(Ticket, {foreignKey: 'passengerId'})
Ticket.belongsTo(Passenger, {foreignKey: 'passengerId'})

module.exports.Passenger = Passenger;
module.exports.Flight = Flight;
module.exports.Employee = require("./employee");
module.exports.Plane = require("./plane");
module.exports.Ticket = Ticket;
