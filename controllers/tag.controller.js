
const Tag =require("../models/tag.model.js")
const tagQuery =require("./query_tag");


exports.create=(req,res)=>{

    const newTag = new Tag({
        name:req.body.tag_name
    });
    
    tagQuery.create(newTag,(err,rows)=>{
        if(err){
            res.status(500).json({message:"failed !!!"})
        }
        console.log(rows);
    })
      
}

exports.findAll=(req,res)=>{
    tagQuery.getAllTag((err,rows)=>{
        if(err){
            res.status(500).json({message:"failed !!!"})
        }else{
            res.status(200).json({message:rows})
        }
    })
}

exports.findOne=(req,res)=>{
    tagQuery.getOne(req.body.tagname,(err,rows)=>{
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
