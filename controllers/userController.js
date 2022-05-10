const creUser=require('../models/createUser');

function createNewUser(req,res){
    let data=req.body;
   
    
    
   
    console.log(data);
    creUser.CreateUser(data,function(err,result){
        console.log(data);
        if(err){
            console.log(err);
            return res.status(500).send({
                message:"Unable to Insert",
                success:false
            })
        }
        return res.status(200).send({
            message:"Successfully Registered",
            success:true,
            categories:result
        })
    })
    
}
module.exports={createNewUser};