
const Blog =require("../models/blog.model.js")

exports.create = (req,res)=>{

    //chech validate request
    if (!req.body){
        res.status(400).send({
            messsage:"create failed!!"
        })
    }

    //create a new blog object
    const blog = new Blog({
        title:req.body.title,
        body: req.body.body,
        userId:req.body.userId
    });

    console.log(blog);

    //using model to add to db
};

exports.findAll = (req,res) =>{
    Blog.getAll((err, data) => {
        console.log(err,data);
        if (err){
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving blogs."
          });
        } 
        else res.status(200).json({messsage:data});
    });
      
      
     
};

exports.findOne =(req,res) =>{

};

exports.update = (req,res) =>{

};

exports.delete =(req,res) =>{

};

