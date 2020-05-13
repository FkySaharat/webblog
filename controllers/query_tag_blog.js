const sql =require("../database.js");

//create
exports.bindTagToBlog=(tag_id,blog_id,result)=>{
    console.log(tag_id,blog_id)
    sql.query(
        "INSERT INTO blog_tag_junction (tag_id,blog_id) VALUES (?,?)",[tag_id,blog_id],function(err,rows){
            if(err) throw err;
            result(null,rows);
    });
};

exports.removeTagFromBlog=(tag_name,blog_id,result)=>{

}


exports.removeBlogFromTags=(blog_id,result)=>{
    
}