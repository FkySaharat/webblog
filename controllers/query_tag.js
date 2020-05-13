const sql =require("../database.js");

exports.create=(newTag,result)=>{
    sql.query(
        `INSERT INTO tags 
        (tag_name)
        
        SELECT ? 
        WHERE NOT EXISTS(SELECT * FROM tags WHERE tag_name = ?) 
        `
        ,[newTag.tag_name,newTag.tag_name],(err,res)=>{
        if(err) throw err;
        result(null,res);
        //res.InsertId
    });

}

exports.getAllTag=(result)=>{
    sql.query("SELECT * FROM tags",(err,rows)=>{
        if(err) throw err;
        result(null,rows);
    })
}
exports.getOne=(tagname,result)=>{
    sql.query("SELECT * FROM tags WHERE tag_name = ?",tagname,(err,rows)=>{
        if(err) throw err;
        result(null,rows);
    })
}

const removeTagFromBlog=(blog_id,tag_name,result)=>{
    sql.query("DELETE FROM blog_tag_junction WHERE blog_id=? AND tag_id=(SELECT tag_id FROM tags WHERE tag_name = ?)"
    ,[blog_id,tag_name],(err,res)=>{
        if(err) throw err;
        sql.query("SELECT COUNT(tag_id) FROM  blog_tag_junction WHERE tag_id=(SELECT tag_id FROM tags WHERE tag_name = ?)"
        ,tag_name,(err,rows)=>{
            if(err) throw err;
             result(null,rows);
        })
       
    })
    
}

exports.removeTag=(tag_name,result)=>{
    sql.query("DELETE FROM tags WHERE tag_name = ?",tag_name,(err,res)=>{
        if(err) throw err;
        result(null,res);
    })
}
