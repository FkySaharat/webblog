
const express = require("express"),
app = express(),
port = process.env.PORT || 5000,
cors = require("cors");

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

//retrieve all
app.get("/", (req, res) => {
    res.send({ message: "Please!! log in" });
});

//retrieve single blog
app.get('/:blogId',(req,res)=>{
    res.send({ message: "this blog is"+req.params.blogId})
});

//create new blog
app.post('/:title/:content',(req,res)=>{
    res.send({ message: "create success!!"})
});

//del blog
app.delete('/:blogId',(req,res)=>{
    res.send({ message: "deleted this"+req.params.blogId})
});

//edit
app.put('/:blogId/:title/:content',(req,res)=>{
    res.send({ message: "edit this"+req.params.blogId})
});

//tax