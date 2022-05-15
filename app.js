const express= require('express');
const admin=require('./models/adminModal');
const apiRouter=require('./routes');
const creUser=require('./models/createUser');
const bodyParser =require("body-parser");
const { json } = require('express/lib/response');
var nodemailer = require('nodemailer');

// const bodyParser =require("body-parser");
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));
// //const request = require("request");

const app= express();

app.set('view engine','ejs');

app.use(express.json());

app.use(express.static("public"));


 app.use('/',apiRouter);



app.use(bodyParser.urlencoded({extended:false}));


app.get("/",function(req,res){
    res.render('home');
})

app.get("/adminPage",function(req,res){
    res.render('adminPage');
})



app.get('/Signup',function(req,res){
    
    console.log('entered signup log')
    res.render('Signup')

})


app.get('/login',function(req,res){
    
    
   
    console.log('entered signup log');
    res.render('login')

})

app.post('/loginPage',function(req,res){

let data =  req.body;
       creUser.loginCheck(data,function(err,result){
            
        if(err){
            console.log(err);
        }
        if(result.length){
           console.log('user found',result);
         let otp1 =  Math.floor(Math.random()*10000000)
         //Sending Otp to Email
console.log(otp1,"otp ");
let transporter = nodemailer.createTransport({

 host: "smtp.gmail.com",
 port: 587,
 SSL: "Yes",
 Authentication:" Yes",
  auth: {
    user: 'amlifecare2@gmail.com',
    pass: '$Vand@10L'
  }
});
console.log(result)
let mailOptions = {
  from: 'amlifecare2@gmail.com',
  to: result[0].email,
  subject: 'Otp For Login',
  text: 'Hello  '+result[0].fname+' please use 6 digit Otp for login   :  '+otp1
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


//email
  console.log(otp1,"before otp entry into database");

         let dataForOtp={id:result[0].id,otp:otp1}
  
         creUser.otpInsert(dataForOtp,function(err,result){if(err){console.log(err);}else{console.log(result,"otp ok")}})
         return  res.status(200).render('otp')
        } 
        else{
            console.log('user not found');
          return res.render("failure");
        }



       }) 




})

app.post("/otploginPage",function(req,res){

    let data=req.body;
    creUser.otpcheck(data,function(err,result){
        if(err){
            console.log(err)

        }
        else{
            if(result.length>0){
                res.status(200).render("loginPage",{result});
            }
        }
    })



})



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




app.post('/send',function(req,res){
   let data=req.body;
   
    creUser.usercheck(data,function(err,result){
                if(err){
                    console.log(err);
                    return res.status(100)
                }
                console.log(result.length);
                if(result == 0)
                       {
                              console.log('user doesnt exist');

                              creUser.CreateUser(data,function(err,result){
    
                                console.log(data," from      create user");
                                 if(err){
                                        console.log(err);
                                        return res.status(500).send({
                                        message:"Unable to Insert",
                                        success:false
                                                                    })
                                        }
                                        return res.status(200).render("success");
                                        })
                               

                       }
                       else{
                           console.log("user already exists");
                           return res.render('failure');
                       }

    
                      })


            
        }) 
        
        




        
app.listen(process.env.PORT|| 3000,function(){
    console.log("server running at port 3000");
});


