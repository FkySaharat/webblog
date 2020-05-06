var mysql =require('mysql')
const dbConfig = require("./db.config.js");

var connection = mysql.createConnection({
   host:dbConfig.HOST,
   user:dbConfig.USER,
   password:dbConfig.PASSWORD,
   database:dbConfig.DB
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
connection.query("select * from blogs",function(err, rows, fields) {
    if (err) throw err
    console.log('The solution is: ',rows)
  })
connection.end()