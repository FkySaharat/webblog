var mysql =require('mysql')
var connection = mysql.createConnection({
   // 

})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
connection.query("select * from blog",function(err, rows, fields) {
    if (err) throw err
    console.log('The solution is: ',rows)
  })
connection.end()