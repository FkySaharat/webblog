//Handling request 
const Tag =require("../models/tag.model.js")
const Blog =require("../models/blog.model.js");
const blogQuery=require("./query_blog");
const tagQuery=require("./query_tag");
const tagblogQuery=require("./query_tag_blog"); 

exports.create = (req,res)=>{

    //chech validate request
    if (!req.body){
        res.status(400).send({
            messsage:"create failed!!"
        })
    }
   
    //create a new blog object
    const newblog = new Blog({
        title:req.body.title,
        body: req.body.body,
        created_time:new Date(),
        userId:req.body.userId
    });

    const newTag = new Tag({
        name:req.body.tagName
    });

 
    
        blogQuery.create(newblog, (err,blog)=>{
            if(err){
                res.status(500).json({message:"fail"})
                return (err)
            }
            tagQuery.create(newTag,(err, tag)=>{
                if(err){
                    res.status(500).json({message:"fail"})
                    return (err)
                }
                //Tag is already have.
                if(tag.insertId == 0){
                    tagQuery.getOne(tag.insertId,(err,oldtag)=>{
                        if(err){
                            res.status(500).json({message:"fail"})
                            return (err)
                        }
                        tagblogQuery.bindTagToBlog(oldtag[0].tag_id,blog.insertId,(err,rows)=>{
                            if(err){
                                res.status(500).json({message:"fail"})
                                return (err)
                            }
                            res.status(200).json({message:rows});
                        })
                    })
                }
                else{
                    tagblogQuery.bindTagToBlog(tag.insertId,blog.insertId,(err,rows)=>{
                        if(err){
                            res.status(500).json({message:"fail"})
                            return (err)
                        }
                        res.status(200).json({message:rows});
                    }) 
                }
               
            })
        })

    
    
};

exports.findAll = (req,res) =>{
    
    //console.log(Object.keys(req.body).length);
    if(Object.keys(req.body).length){
        console.log("find by sth.",req.body);
        blogQuery.getBy(req.body,(err,data)=>{
            if(err){
                res.status(500).json({
                    message:err.message || "Some error occured!! while finding by"
                });
            }
            else res.status(200).json({message:data});
        });
    }
    else{
        blogQuery.getAll((err, data) => {
            if (err){
                res.status(500).json({
                    message:err.message || "Some error occurred!! while retrieving blogs."
                });
            } 
            else res.status(200).json({message:data});
        });
    }
    
      
      
     
};

exports.findOne =(req,res) =>{
    blogQuery.getOne(req.params.blogId,(err,data)=>{
        if(err){
            res.status(500).json({
                message:err.message || "Some error occurred!! while retrieving blog."
            })
        }
        else res.status(200).json({message:data});
    });
};


exports.update = (req,res) =>{
    blogQuery.update(req.body,req.params.blogId,(err,data)=>{
        if(err){
            res.status(500).json({
                message:err.message ||"Could not update this Blog!!"
            });
        }
        else res.status(200).json({message:"update sucess!!"});
    });
};

//single delete
exports.delete =(req,res) =>{

    var blog = req.params.blogId;

    tagblogQuery.removeBlogFromTags(blog,(err,rows)=>{
        if(err){
            res.status(500).json({message: err.message || "Could not delete this Blog !!!"}); 
        }

        blogQuery.remove(blog,(err,data)=>{
            if(err){
                res.status(500).json({message: err.message || "Could not delete this Blog !!!"}); 
            }
            else{
                console.log("datadel",data)
                if(data ==="not_found"){
                    res.status(200).json({message:"Try again!!"})
                }else{
                    res.status(200).json({message:"remove success!!!"})
                }
            }
        });
    });

    


 
};

