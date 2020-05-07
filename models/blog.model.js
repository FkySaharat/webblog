// connect to db;
const sql =require("../database.js")

const Blog = function(blog){
    this.title = blog.title;
    this.body =blog.body;
    this.user_id =blog.userId;
}

Blog.getAll = result => {
    sql.query("select * from blogs", function(err, rows) {
        if (err){
            result(err,null);
            return;
        }
        //console.log('blogs : ',rows);
        result(null,rows);
      
        
    });

};

Blog.create = (newBlog, result)=>{
    //INSERT INTO blogs SET col1=val1, col2=val2, ...
    sql.query("INSERT INTO blogs SET ?",newBlog,(err,res) =>{
        if (err){
            result(err,null);
            return;
        }

    });
};

Blog.update =(data,updateblog,result)=>{
    sql.query("UPDATE blogs SET ? WHERE blog_id = ?",[data,updateblog],(err,res)=>{
        if(err){
            result(err,null);
            return;
        }
    });
}

Blog.remove =(deletedblog,result)=>{
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

module.exports = Blog;