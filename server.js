
const express = require("express");
const bodyParser = require("body-parser");

app = express();
port = process.env.PORT || 5000,
cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

const blog =require("./controllers/blog.controller.js")

//retrieve all
app.get("/blog/", blog.findAll);

//retrieve single blog
app.get('/blog/:blogId',blog.findOne);

//create new blog ,must have json body
app.post('/blog/',blog.create);

//del blog
app.delete('/blog/:blogId',blog.delete);

//edit ,must have json body
app.put('/blog/:blogId/',blog.update);

//tax