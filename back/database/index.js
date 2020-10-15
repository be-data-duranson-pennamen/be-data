const mysql = require("mysql");

const airportDatabase = mysql.createPool({
  host: process.env.DATABASE_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_AIRPORT,
})
module.exports.airportDatabase = airportDatabase