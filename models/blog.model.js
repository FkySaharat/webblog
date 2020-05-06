// connect to db;
const sql =require("../database.js")

const Blog = function(blog){
    this.title = blog.title;
    this.body =blog.body;
    this.userId =blog.userId;
}

Blog.getAll = result => {
    sql.query("select * from blogs", function(err, rows) {
        if (err) throw err;
        if (err){
            result(err,null);
            return;
        }
        console.log('blogs : ',rows);
        result(null,rows);
      
        
    });

    
};

module.exports = Blog;