
const express = require("express");
const bodyParser = require("body-parser");

app = express();
port = process.env.PORT || 5000,
cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

const blog =require("./controllers/blog.controller.js");
const tag =require("./controllers/tag.controller.js");

app.get("/", (req,res)=>{
    res.json({message:"Home"});
});

//retrieve all 
app.get("/blogs", blog.findAll);

//retrieve single blog
app.get('/blog/:blogId',blog.findOne);

//create new blog ,must have json body
app.post('/blog/',blog.create);

//del blog
app.delete('/blog/:blogId',blog.delete);

//edit ,must have json body
app.put('/blog/:blogId/',blog.update);

//tax
app.get("/tags",tag.findAll);
app.get("/tag",tag.findOne);
app.post("/tag/",tag.create);
app.delete("/tag",tag.delete);
