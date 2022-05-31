const DriverModal=require('../models/driverModal');
const express=require('express');
const app= express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var nodemailer = require('nodemailer');
const bodyParser =require("body-parser");


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));



// app.set('view engine','ejs');



function DriverSignup(req,res){
    
    res.render('../views/driver/driverSignup.ejs');


}



function DriverLogin(req,res){
    res.render('../views/driver/Driverlogin.ejs');
}



function createNewDriver(req,res){
   
    let data=req.body;
    console.log("from driver Controller cre new Driver",data);
    DriverModal.usercheck(data,function(err,result){
        if(err){
                console.log(err);
                return res.status(100)
        }
        console.log(result.length);
        if(result == 0){
            console.log('user doesnt exist');//hashing
             bcrypt.hash(data.password, saltRounds).then(function(hash) {
             // Store hash in your password DB.
             data.password=hash;
             DriverModal.CreateUser(data,function(err,result){
               console.log(" from result",result);
               // console.log(data," from create user");
                if(err){
                console.log(err);
                return res.status(500).send({
                message:"Unable to Insert",
                success:false
                })}
                
                DriverModal.InsertDriversAvailabitlity(data,function(err,result1){
                  if(err){
                    console.log("Unable to Insert status of  Availability",err);
                  }  
                  else{
                    console.log("successfullly inserted into Availability",result1);
                  }
                })
               return res.status(200).render("../views/driver/Driverlogin.ejs");
        })
    })
   }
   else{
         console.log("user already exists");
         return res.render('failure');
   }
  })
 }


 function DriverloginAuthentication(req,res){
   
   
 let data =  req.body;

               DriverModal.loginCheck(data,function(err,result){
                    
                if(err){
                    console.log(err);
                }
                if(result.length){
                    
                  console.log(result);
                  let  hash=result[0].PASSWORD

                  bcrypt.compare(data.password,hash).then(function(result1){
                        // result == true
                        
                        console.log('user found',result1);
                        let otp1 =  Math.floor(Math.random()*10000000)
                        //Sending Otp to Email
               console.log(otp1,"otp ");
               let transporter = nodemailer.createTransport({
               
                host: "smtp.gmail.com",
                port: 587,
                SSL: "Yes",
                Authentication:" Yes",
                 auth: {
                   user: process.env.user_email,
                   pass: process.env.user_Password
                 }
               });
               console.log(result1)
               let mailOptions = {
                 from: 'amlifecare2@gmail.com',
                 to: result[0].email,
                 subject: 'Otp For Login',
                 text: 'Hello  '+result[0].fname+' please use 6 digit Otp for login   :  '+otp1
               };
               
               transporter.sendMail(mailOptions, function(error, info){
                 if (error) {
                   console.log(error);
                 } 
                 else{
                   console.log('Email sent: ' + info.response);
                }
            });
            console.log(otp1,"before otp entry into database");               
            let dataForOtp={id:result[0].id,otp:otp1}
                 
            DriverModal.otpInsert(dataForOtp,function(err,result){if(err){console.log(err);}else{console.log(result,"otp ok")}})
       
            return  res.status(200).render('otp')
            });
          } 
          else{
          console.log('user not found');
          return res.render("failure");
        }
      })
    }
            
    function DriverLoginSuccessPage(req,res){
             
    let data=req.body;
    DriverModal.otpcheck(data,function(err,result){
        if(err){
          console.log("from DriverLOginSuccess",err);
          }
             else{
                if(result.length>0){
                    res.status(200).render("../views/driver/DriverloginPage",{result});
                }
            }
        })
    
     
          
          }
               

        
        


function getUsers(req,res){
  
        DriverModal.getAllUsers(function(err,result){
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



function driverStatusUpdate(req,res){
  let data=req.body;
  console.log("from driver Update",data)
  DriverModal.UpdateDriversAvailabilty(data,function(err,result){
    if(err){
      console.log(err);
      return res.status(400).render('queryErrors',{error:err});
    }
        return res.status(200).send({
        message:"Successfully updated the status of driver ",
        success:true,
        data:result
    })
  })
}


function driveroffersList(req,res){
  let data=req.body;
  console.log("Enter into Offers Controller",data);
 DriverModal.driverOffersList(data,function(err,result){
 if(err){
   console.log(err);
 }
 return res.status(200).send({
  message:"Successfully Got the Offers",
  success:true,
  data:result
})
 })


}


module.exports={createNewDriver,getUsers,DriverSignup,DriverloginAuthentication,DriverLogin,DriverLoginSuccessPage,driverStatusUpdate,
driveroffersList};