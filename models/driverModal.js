const sqlConnection= require("../services/sqlConnection");

function CreateUser(data,callback){
    
    let values=Object.values(data);
    
    values[5]=new Date();

    console.log(values);

    const sql="INSERT INTO Driver_INFO (fname,lname,email,password,phone,CreatedTime) values (?,?,?,?,?,?)";

    sqlConnection.executeQuery(sql,values,function(err,result){
        
        callback(err,result);
        
    })
   
}

function getAllUsers(callback){
    let values=[];
    const sql="select * from Driver_INFO ";
    sqlConnection.executeQuery(sql,values,function(err,result){
        
        callback(err,result);
    })

}

function usercheck(data, callback){
     let values = data.Email;  
     console.log(values,"from user check ")
     const sql =" select * from Driver_INFO where email = ?" ;
     sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
    })
}




function loginCheck(data,callback)
{
   let  values=data.email;
   console.log("from Login Check ",values)
   const sql =" select * from Driver_INFO where email = ?";
   sqlConnection.executeQuery(sql,values,function(err,result){
   callback(err,result);
 })   
}




function InsertDriversAvailabitlity(data,callback){
    let values=data.Email;
    console.log(data);
    console.log("from Insert Drivers  Avialbility modal",values);
    const sql="select id from Driver_INFO where email=?";
   
    sqlConnection.executeQuery(sql,values,function(err,result){
    
        const sql1="Insert into AvailableDrivers (id,available) values (?,?) ";
       
        let values1=[result[0].id,"NO"]; 
        console.log("from Nested query",result,values1);
        sqlConnection.executeQuery(sql1,values1,function(err1,result1){
            callback(err1,result1);
        })

        
    })
}


function UpdateDriversAvailabilty(data,callback){
    let values=[data.available,data.id];
    console.log("from driver status update Modal",values);
     

    const sql="update AvailableDrivers set available=? where id=?";
    sqlConnection.executeQuery(sql,values,function(err,result){
        
        callback(err,result);
    })
}




function driverOffersList(data,callback){
let values=data.id;
const sql="select * from Bookings  where  idBookings in (select booking_id from offers where Driver_id=? and status='pending')";
    sqlConnection.executeQuery(sql,values,function(err,result){
        console.log("From Driver modal offers list for Drivers",result)
        callback(err,result);
    })
}


// Accept Ride

 function AcceptOffer(data,callback){
//  data we need Booking ID ,Driver ID, need to update the Status to Accept in BOOKING table and offers Table
    let values=[data.driver_id,data.booking_Id];
   
    console.log("From Driver Accepted Modal",values);
    
    const sql=`UPDATE offers set status='ACCEPTED' where Driver_id=? and booking_id=?`;
   
    sqlConnection.executeQuery(sql,values,function(err,result){
        
         values =data.patientId;
        
         console.log("From Driver Accepted Modal2",values);
        
         const sql1=`SELECT * FROM patient WHERE id=?`;
         
         sqlConnection.executeQuery(sql1,values,function(err1,result1){

             callback({err_one:err,err_two:err1},{result1:result,result2:result1});
        });   
    });
}

     function rejectOffer(data,callback){
         //  data we need Booking ID ,Driver ID, need to update the Status to Accept in BOOKING table and offers Table
     let values=[data.driver_id,data.booking_Id];
             
     const sql=`DELETE FROM offers  where Driver_id=? and booking_id=?`;
     sqlConnection.executeQuery(sql,values,function(err,result){
         callback(err,result);
     });
 }
     
function driverCompletedOffer(data,callback){
    let values=[data.driver_id,data.booking_Id];
    const sql=`UPDATE  offers set status="COMPLETED"  where Driver_id=? and booking_id=?`;
    sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
    });
}


function PreviousBookings(data,callback){
      
      let values=[];
      const sql=`select  from Bookings  where  idBookings in (select booking_id from offers where Driver_id=? and status='pending') `;
}

module.exports={CreateUser,getAllUsers,usercheck,loginCheck,InsertDriversAvailabitlity,UpdateDriversAvailabilty,driverOffersList,AcceptOffer,rejectOffer,driverCompletedOffer};