const mysql = require("mysql");

const airportDatabase = mysql.createPool({
  host: process.env.DATABASE_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})
module.exports.airportDatabase = airportDatabase