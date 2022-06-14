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

// Express initializes app to be a function handler

const app= express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
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


let users=[];
io.on('connection', (socket) => {
users.push(socket.id);
    console.log('a user connected');
   
    socket.on('disconnect', () => {
        console.log('user disconnected');
        users.length=0;
      });
      socket.on("patient-booking",(msg)=>{

       io.emit("send-data-to-all-Drivers",msg);
        console.log("form server",msg);
    });

    socket.on("driverConformedOffer",(msg)=>{
        console.log("data received",msg);
        io.emit("sendDriverData",msg);
        
    
    });

    console.log("INSIDE SOCKET",users);
 });



        
server.listen(process.env.PORT|| 3000,function(){
   
    console.log("server running at port 3000");

});


