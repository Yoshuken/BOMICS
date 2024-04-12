
const mysql = require('mysql2');
const util = require("util"); 

const conexionMySQL = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// promise wrapper to enable async await with MYSQL
conexionMySQL.query = util.promisify(conexionMySQL.query).bind(conexionMySQL);

conexionMySQL.connect(err => {
  if (err) {
    console.log('MySQL connexion error:', err);
  }
  console.log('MySQL succesful connexion');
});

module.exports = conexionMySQL;