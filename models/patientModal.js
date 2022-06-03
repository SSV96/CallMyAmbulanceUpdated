const res = require('express/lib/response');
const sqlConnection=require('../services/sqlConnection');


function CreatePatient(data,callback){
 
     let values=Object.values(data);
     values.push(new Date);

     const sql="INSERT INTO patient (name,email,password,phone,createdAt) values (?,?,?,?,?)";

     sqlConnection.executeQuery(sql,values,function(err,result){
     
     callback(err,result);
 })
}

function PatientLoginCheck(data,callback){
   
  let values=Object.values(data);
  const sql="select * from patient where email=? and password=?";

 sqlConnection.executeQuery(sql,values,function(err,result){

    callback(err,result);
 })
}

function getcurrentBookingByID(data,callback){

  let values=data.id;
  const sql="select * from Bookings where patientid=? and status='pending' ";

  sqlConnection.executeQuery(sql,values,function(err,result){
    callback(err,result);
  })

}


// for Booking
function AmbulanceBookingRequest(data,callback){
  let values=Object.values(data);
  
  values[4]=Number(values[3])*50;//50 ruppes per KM
  values[5]="pending";
  values.push(new Date);
  
     console.log("From patient Query",values);
     const sql=' insert into Bookings (PatientId,pickuppoint,droppingpoint,distance,fare,status,date) values (?,?,?,?,?,?,?)';
 //  const sql="INSERT INTO Bookings (PatientId,PickUpPoint,Dropping Point,Distance,Fare,Status,createdAt) values (?,?,?,?,?,?,?)";

  sqlConnection.executeQuery(sql,values,function(err,result){
    let values2=[values[0]];
    const sql="select * from Bookings where patientid=?";  
    sqlConnection.executeQuery(sql,values,function(err,result1){
    callback(err,{r1:result,r2:result1});
    
  })
})
}


function getBookingsById(data,callback){

  let values=data.id;
  const sql="select * from Bookings where patientid=?";
  sqlConnection.executeQuery(sql,values,function(err,result){
  callback(err,result);
 })
}


//for Admin

function getPatients(data,callback){
   
  let values=[];
  const sql="select *from patient";

  sqlConnection.executeQuery(sql,values,function(err,result){
    console.log("from Query",err);

    console.log("from result",result);

    callback(err,result)
  })
}

function Insertoffers(data,callback){
  let values;
  console.log("From Insert Offers modal",data);
  const sql="select * from AvailableDrivers where available='yes'";

     sqlConnection.executeQuery(sql,values,function(err,result){
     
     console.log("from query result",result);//[{}];
     for(let i=0;i<result.length;i++){
     console.log("Inserted Offer",i+1);
     for(let j=0;j<data.length;j++){
     let values1=[result[i].id,data[j].idBookings,"Pending"];
     const sql1="INSERT INTO offers  (Driver_id,booking_id,status) values (?,?,?)";
     sqlConnection.executeQuery(sql1,values1,function(err1,result1){
    // callback(err1,result1);
    //callback(err,result);
     console.log("res",result[i].id,"data ",data[j].idBookings);
     })
    }

   }
   callback(err,result);
  })
 }


function  CheckingStatusOfOffer(data,callback){

  let values=[];
  
  const sql=`SELECT * from offers where status='ACCEPTED' `;


}



module.exports={CreatePatient,getPatients,PatientLoginCheck,AmbulanceBookingRequest,getBookingsById,getcurrentBookingByID,Insertoffers};

