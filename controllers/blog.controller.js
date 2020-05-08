// connect to db;
const sql =require("../database.js")
const Blog =require("../models/blog.model.js")

 function getAll(result){
    sql.query("select * from blogs", function(err, rows) {
        if (err){
                result(err,null);
                return;
        }
            
        if(rows){
            blogs=[]
            rows.map(blog=>{
               

                var newblog = new Blog({
                    title:blog.title,
                    body: blog.body,
                    time:blog.time,
                    userId:blog.user_id
                });
                blogs.push(newblog);
            }) 
            console.log("arr",blogs);
            result(null,blogs);
        }
        else result(null,[])
            
            
            
        });
    
};
    
const create = (newBlog, result)=>{
        //INSERT INTO blogs SET col1=val1, col2=val2, ...
        sql.query("INSERT INTO blogs SET ?",newBlog,(err,res) =>{
            if(err) throw err
            if (err){
                result(err,null);
                return;
            }
    
        });
    };
    
update =(data,updateblog,result)=>{
        sql.query("UPDATE blogs SET ? WHERE blog_id = ?",[data,updateblog],(err,res)=>{
            if(err){
                result(err,null);
                return;
            }
        });
    }
    
remove =(deletedblog,result)=>{
        sql.query("DELETE FROM blogs WHERE blog_id = ?",deletedblog,(err,res)=>{
            if (err){
                result(err,null);
                return;
            }
    
            if (res.affectedRows == 0) {
                // not found Customer with the id
                result(null,{ kind: "not_found" });
                return;
              }
        });
}

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
        time:new Date(),
        userId:req.body.userId
    });

    console.log("newblog",newblog);

    //using model to add to db
    create(newblog,(err,data)=>{
        if(err){
            res.status(500).json({
                message:err.message || "Some error occured!! while creating the new blog"
            });
        }
        else res.status(200).json({message:"create success!!"});
    });
    
};

exports.findAll = (req,res) =>{
    getAll((err, data) => {
        console.log("findall",data);
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
    Blog.update(req.body,req.params.blogId,(err,data)=>{
        if(err){
            res.status(500).json({
                message:"Could not update this Blog!!"
            });
        }
    });
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

