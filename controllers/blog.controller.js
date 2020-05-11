//Handling request 
// connect to db;
const sql =require("../database.js")
const Blog =require("../models/blog.model.js")

 const getAll =(result)=>{
    sql.query("select * from blogs", function(err, rows) {
        if (err){
            result(err,null);
            return;
        }
            
        if(rows){
            blogs=[]
            rows.map(blog=>{
                var newblog = new Blog({
                    blog_id:blog.blog_id,
                    title:blog.title,
                    body: blog.body,
                    created_time:blog.created_time,
                    userId:blog.user_id
                });
                blogs.push(newblog);
            }) 
            console.log("arr",blogs);
            result(null,blogs);
        }
        else result(null,[]);

    });
    
}

const getBy =(filter,result)=>{
    sql.query("select * from blogs where ?",filter, function(err,rows){
        if (err){
            result(err,null);
            return;
        }
        console.log(rows);

        if(rows.length){
            console.log(rows);
            blogs=[]
            rows.map(blog=>{
                var newblog = new Blog({
                    blog_id:blog.blog_id,
                    title:blog.title,
                    body: blog.body,
                    created_time:blog.created_time,
                    userId:blog.user_id
                });
                blogs.push(newblog);
            }) 
            console.log("arr",blogs);
            result(null,blogs);
        }
        else result(null,[])
       
    });
   
}

const getOne =(seletedblog,result)=>{
    console.log("sel",seletedblog);
    sql.query("SELECT * FROM blogs WHERE blog_id = ?",seletedblog,(err,row)=>{
        if(err) throw err
        if(row.length){
            console.log("row->",row);
            var blog =row[0];
            var newblog = new Blog({
                blog_id:blog.blog_id,
                title:blog.title,
                body: blog.body,
                created_time:blog.created_time,
                userId:blog.user_id
            });
            result(null,newblog)
            return; 
        }
        else result(null,[]);
    });
}

const create = (newBlog, result)=>{
        //INSERT INTO blogs SET col1=val1, col2=val2, ...
        sql.query("INSERT INTO blogs SET ?",newBlog,(err,res) =>{
            if(err) throw err
            return;
        });
    };
    
const update =(data,updateblog,result)=>{
        sql.query("UPDATE blogs SET ? WHERE blog_id = ?",[data,updateblog],(err,res)=>{
            if(err){
                result(err,null);
                return;
            }
        });
    }
    
const remove =(deletedblog,result)=>{
        sql.query("DELETE FROM blogs WHERE blog_id = ?",deletedblog,(err,res)=>{
            if (err){
                result(err,null);
                return;
            }
    
            if (res.affectedRows == 0) {
                console.log("del",res);
                // not found Customer with the id
                result(null,"not_found");
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
        created_time:new Date(),
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
    
    //console.log(Object.keys(req.body).length);
    if(Object.keys(req.body).length){
        console.log("find by sth.",req.body);
        getBy(req.body,(err,data)=>{
            if(err){
                res.status(500).json({
                    message:err.message || "Some error occured!! while finding by"
                });
            }
            else res.status(200).json({message:data});
        });
    }
    else{
        getAll((err, data) => {
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
    getOne(req.params.blogId,(err,data)=>{
        if(err){
            res.status(500).json({
                message:err.message || "Some error occurred!! while retrieving blog."
            })
        }
        else res.status(200).json({message:data});
    });
};

exports.update = (req,res) =>{
    update(req.body,req.params.blogId,(err,data)=>{
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
    remove(req.params.blogId,(err,data)=>{
        if(err){
            res.status(500).json({
            message: err.message || "Could not delete this Blog !!!"
            }); 
        }
        else{
            console.log("datadel",data)
            if(data ==="not_found"){
                res.status(200).json({message:"Try again!!"})
            }else{
                res.status(200).json({message:"remove success!!!"})
            }
        }
          
    })


 
};

