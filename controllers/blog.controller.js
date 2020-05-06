
const Blog =require("../models/blog.model.js")

exports.create = (req,res)=>{

    //chech validate request
    if (!req.body){
        res.status(400).send({
            messsage:"create failed!!"
        })
    }
    console.log(req.body.userId);
    //create a new blog object
    const newblog = new Blog({
        title:req.body.title,
        body: req.body.body,
        userId:req.body.userId
    });

    console.log(newblog);

    //using model to add to db
    Blog.create(newblog,(err,data)=>{
        if(err){
            res.status(500).json({
                message:err.message || "Some error occured!! while creating the new blog"
            });
        }
        else res.status(200).json({message:"create success!!"});
    });
    
};

exports.findAll = (req,res) =>{
    Blog.getAll((err, data) => {
        console.log(err,data);
        if (err){
          res.status(500).json({
            message:
              err.message || "Some error occurred!! while retrieving blogs."
          });
        } 
        else res.status(200).json({message:data});
    });
      
      
     
};

exports.findOne =(req,res) =>{

};

exports.update = (req,res) =>{

};

exports.delete =(req,res) =>{
    Blog.remove(req.params.blogId,(err,data)=>{
        if(err){
            res.status(500).json({
            message: "Could not delete this Blog !!!"
            }); 
        }
        else{
            if(data ==="not_found"){
                res.json({message:"Try again!!"})
            }else{
                res.json({message:"remove success!!!"})
            }
        }
          
    })
};

