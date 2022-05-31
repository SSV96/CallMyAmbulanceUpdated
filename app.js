
// for bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
require ('dotenv').config();
const express= require('express');
const admin=require('./models/adminModal');

const creUser=require('./models/driverModal');
const bodyParser =require("body-parser");
const { json } = require('express/lib/response');
var nodemailer = require('nodemailer');


//routes


const DriverRoute=require('./routes/driverRoute');
const PatientRoute=require('./routes/patientRoute');
const adminRoute=require('./routes/adminRoute');



// const bodyParser =require("body-parser");
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));
// //const request = require("request");

const app= express();


// Middlewares

app.set('view engine','ejs');

app.use(express.json());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));



//   Routers 
app.use('/driver',DriverRoute);

app.use('/patient',PatientRoute);

app.use('/admin',adminRoute);





app.get("/",function(req,res){
    res.render('home');
})







app.get('/login',function(req,res){
    
    
   
    console.log('entered Login  log');
    res.render('login');

})

app.get('/booking',function(req,res){
    console.log("booking page");
    res.render('booking');
})


//email
  




app.get('/truncate',function(req,res){

    admin.truncateAll(function(err,result){
   
         if(err){
             console.log(err);
             return res.status(100)
         }
         else{
             res.status(200).render('success');
         }


    })


})




        
app.listen(process.env.PORT|| 3000,function(){
    console.log("server running at port 3000");
});


