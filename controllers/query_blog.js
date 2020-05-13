// connect to db;
const sql =require("../database.js")
const Blog =require("../models/blog.model")

//create
exports.create = (newBlog, result)=>{
    //INSERT INTO blogs SET col1=val1, col2=val2, ...
    
    sql.query("INSERT INTO blogs SET ?",newBlog, (err,res) =>{
        if(err) throw err
        console.log("query done")
        result(null,res);
        //res.InsertId
    });    
};

//read
exports.getAll =(result)=>{
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

exports.getBy =(filter,result)=>{
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

exports.getOne =(seletedblog,result)=>{
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



 //update   
exports.update =(data,updateblog,result)=>{
        sql.query("UPDATE blogs SET ? WHERE blog_id = ?",[data,updateblog],(err,res)=>{
            if(err){
                result(err,null);
                return;
            }
            else result(null,res);
        });
    }
    

 //delete   
exports.remove =(deletedblog,result)=>{
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
            else result(null,res);
        });
}