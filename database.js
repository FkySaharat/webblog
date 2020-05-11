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
      `CREATE TABLE blogs 
      ( 
        blog_id int(10)  UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, 
        title varchar(30), body varchar(255), 
        created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        user_id int(10) UNSIGNED DEFAULT 1 NOT NULL
      )`,
      function(err,result){
        if(err) throw err
      });

     connection.query(
       `CREATE TABLE edits 
       (
         edit_id int(100) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
         edit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         blog_id int(10) UNSIGNED NOT NULL,
         CONSTRAINT fk_editedblog_id FOREIGN KEY (blog_id) REFERENCES blogs(blog_id)
       )
       `,
       function(err,result){
        if(err) throw err
      }); 

    connection.query(
      `CREATE TABLE users 
      ( 
        user_id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, 
        user_name varchar(30) NOT NULL, 
        password varchar(40) NOT NULL,
        first_name varchar(30) DEFAULT "",
        last_name varchar(30) DEFAULT "",
        display_name varchar(40) NOT NULL DEFAULT "",
        email varchar(30) DEFAULT "",
        created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      function(err,result){
        if(err) throw err
      });  

    connection.query(
      `CREATE TABLE tags 
      (
        tag_id int(10)  UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, 
        tag_name varchar(40) NOT NULL,
        seen int(10)  DEFAULT 0, 
        UNIQUE(tag_name)
      )`,
      function(err,result){
        if(err) throw err
    });

    connection.query(
      `ALTER TABLE blogs 
       ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)`,
    function(err,result){
      if(err) throw err
      console.log("connect blog to user,success!!")
    });

    connection.query(
      `CREATE TABLE blog_tag_junction 
      (
        blog_id int(10) UNSIGNED NOT NULL,
        tag_id int(10) UNSIGNED NOT NULL, 
        CONSTRAINT pk_blog_tag PRIMARY KEY(blog_id,tag_id), 
        CONSTRAINT fk_blog_id FOREIGN KEY (blog_id) REFERENCES blogs(blog_id), 
        CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
      )`,
    function(err,result){
      if(err) throw err
    });

    connection.query(
      "INSERT INTO users (user_name,password) VALUES ('test','test')",
      function(err,result){
        if(err) throw err
    });

  });

     
/*  
connection.end()
*/

module.exports = connection;