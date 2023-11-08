//installer mysql via : npm install mysql
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thebradery'
})


connection.connect();

module.exports = connection;
