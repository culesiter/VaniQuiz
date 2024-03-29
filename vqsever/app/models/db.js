const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

console.log('dbConfig', dbConfig);
var connection = mysql.createPool({
  connectionLimit : 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;
