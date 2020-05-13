const sql =require("../database.js");

//create
exports.bindTagToBlog=(tag_id,blog_id,result)=>{
    console.log(tag_id,blog_id)
    sql.query(
        `INSERT INTO blog_tag_junction 
        (tag_id,blog_id) 
        VALUES (?,?)`,
        [tag_id,blog_id],
        function(err,rows){
            if(err) throw err;
            result(null,rows);
        }
    );
};

exports.removeTagFromBlog=(tag_name,blog_id,result)=>{
    sql.query(
        `DELETE FROM blog_tag_junction
         WHERE tag_id= ? AND blog_id= ?`,
        [tag_id,blog_id],
        function(err,rows){
            if(err) throw err;
            result(null,rows);}
        );
};


exports.removeBlogFromTags=(blog_id,result)=>{
    sql.query(
        `DELETE FROM blog_tag_junction
         WHERE blog_id= ?`,
        blog_id,
        function(err,rows){
            if(err) throw err;
            result(null,rows);}
        );
}