const sql =require("../database.js");


//create
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

//read
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



//delete
exports.removeTag=(tag_name,result)=>{

    
    sql.query("DELETE FROM tags WHERE tag_name = ?",tag_name,(err,res)=>{
        if(err) throw err;
        result(null,res);
    })
}
