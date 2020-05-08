var mysql =require('mysql')
const dbConfig = require("./db.config.js");

const connection = mysql.createConnection({
   host:dbConfig.HOST,
   user:dbConfig.USER,
   password:dbConfig.PASSWORD,
   database:dbConfig.DB
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    connection.query(
      "DROP DATABASE IF EXISTS webblog",
    function(err,result){
      if(err) throw err
      console.log("DROP success!!")

    });

    connection.query(
      "CREATE DATABASE webblog",
    function(err,result){
      if(err) throw err
      console.log("create new database successs")

    });

    connection.query("use webblog",function(err,result){
      if(err) throw err
    });

    connection.query(
      "CREATE TABLE blogs ( blog_id int(10)  UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, title varchar(30), body varchar(255), time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id int(10) UNSIGNED DEFAULT 1 NOT NULL)",
      function(err,result){
        if(err) throw err
      });

    connection.query(
      "CREATE TABLE users ( user_id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, user_name varchar(30) NOT NULL, password varchar(40) NOT NULL)",
      function(err,result){
        if(err) throw err
      });  

    connection.query(
      "CREATE TABLE taxs (tax_id int(10)  UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, tax_name varchar(40) NOT NULL, UNIQUE(tax_name))",
      function(err,result){
        if(err) throw err
    });

    connection.query(
      "ALTER TABLE blogs ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)",
    function(err,result){
      if(err) throw err
      console.log("connect blog to user,success!!")
    });

    connection.query(
      "CREATE TABLE blog_tax_junction (blog_id int(10) UNSIGNED NOT NULL,tax_id int(10) UNSIGNED NOT NULL, CONSTRAINT pk_blog_tax PRIMARY KEY(blog_id,tax_id), CONSTRAINT fk_blog_id FOREIGN KEY (blog_id) REFERENCES blogs(blog_id), CONSTRAINT fk_tax_id FOREIGN KEY (tax_id) REFERENCES taxs(tax_id))",
    function(err,result){
      if(err) throw err
    });




  });

    
 
 
  
/*  
connection.query("select * from blogs",function(err, rows, fields) {
    if (err) throw err
    console.log('The solution is: ',rows)
  })
connection.end()
*/

module.exports = connection;