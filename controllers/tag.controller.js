const sql =require("../database.js")
const Tag =require("../models/tag.model.js")

const createTag=(newTag,result)=>{
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

const bindTagBlog=(blog_id,tag_name,result)=>{
    result(null,"test")
    /*
    sql.query(
        `INSERT INTO blog_tag_junction
        (blog_id,tag_id)
        values(?,(SELECT tag_id FROM tags WHERE tag_name = ?))
        `
        ,[blog_id,tag_name],(err,rows)=>{

    });*/
}

const getAllTag=(result)=>{
    sql.query("SELECT * FROM tags",(err,rows)=>{
        if(err) throw err;
        result(null,rows);
    })
}

const getOne=(tagname,result)=>{
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

const removeTag=(tag_name,result)=>{
    sql.query("DELETE FROM tags WHERE tag_name = ?",tag_name,(err,res)=>{
        if(err) throw err;
        result(null,res);
    })
}

exports.create=(req,res)=>{

    const newTag = new Tag({
        name:req.body.tag_name
    });
    
    createTag(newTag,(err,rows)=>{
        if(err){
            res.status(500).json({message:"failed !!!"})
        }
        console.log(rows);
    })
      
}

exports.findAll=(req,res)=>{
    getAllTag((err,rows)=>{
        if(err){
            res.status(500).json({message:"failed !!!"})
        }else{
            res.status(200).json({message:rows})
        }
    })
}

exports.findOne=(req,res)=>{
    getOne(req.body.tagname,(err,rows)=>{
        if(err){
            res.status(500).json({message:"failed !!!"})
        }else{
            res.status(200).json({message:rows})
        }
    })
}


//blog_id,tag_name
exports.delete=(req,res)=>{
    //if not exist in conjunction , tag ables to delete from tag
    //if exist in conjunction
        //delete in conjuction by matched blog id

}
