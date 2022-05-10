const express= require('express');

const apiRouter=require('./routes');
const creUser=require('./models/createUser');
const bodyParser =require("body-parser");
const { json } = require('express/lib/response');



//const request = require("request");

const app= express();

app.use(express.json());

// app.use('/',apiRouter);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));


app.get("/",function(req,res){
    res.sendFile(__dirname+'/Signup.html');
})

app.post("/send",function createNewUser(req,res){
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
        return res.status(200).sendFile(__dirname+"/success.html");
    })
    
});



app.listen(3000,function(){
    console.log("server running at port 3000");
});


