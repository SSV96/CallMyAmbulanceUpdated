const creUser=require('../models/createUser');
const express=require('express');
const app= express();
const bodyParser =require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));



// app.set('view engine','ejs');

function createNewUser(req,res){
    let data=req.body;
   
    
    
   
    console.log(data);
    // creUser.CreateUser(data,function(err,result){
    //     console.log(data);
    //     if(err){
    //         console.log(err);
    //         return res.status(500).send({
    //             message:"Unable to Insert",
    //             success:false
    //         })
    //     }
    //     return res.status(200).send({
    //         message:"Successfully Registered",
    //         success:true,
    //         categories:result
    //     })
    // })
    res.send(data);
}

function getUsers(req,res){
  
        creUser.getAllUsers(function(err,result){
        if(err){
            console.log(err);
            return res.status(500).send({
                message:"Unable to Get details",
                success:false
            })
        }
        console.log(result);
        return res.status(200).render('getusers',{result })
    })
    
}

 function getUserById(req,res){
           


 }


module.exports={createNewUser,getUsers};