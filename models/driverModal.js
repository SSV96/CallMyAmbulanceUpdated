const sqlConnection= require("../services/sqlConnection");

function CreateUser(data,callback){
    let values=[];
     
     values[0]=data.FirstName;
     values[1]=data.LastName;
     values[2]=data.Email;
     values[3]=new Date();
     values[4]=data.password;
     values[5]=data.phone;

     console.log(values);
    const sql="insert into useram (fname,lname,email,CreatedTime,PASSWORD,phone) values (?,?,?,?,?,?)";
    sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
        
    })
   
}

function getAllUsers(callback){
    let values=[];
    const sql="select * from useram ";
    sqlConnection.executeQuery(sql,values,function(err,result){
        
        callback(err,result);
    })

}

function usercheck(data, callback){
     let values = data.Email;  
     console.log(values,"from user check ")
    const sql =" select * from useram where email = ?" ;
    sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
    })

}

function loginCheck(data,callback)
{
    let  email = data.email;
   
   let  values=[email]
     
        
    console.log("from ",values)
   const sql =" select * from useram where email = ?";
   sqlConnection.executeQuery(sql,values,function(err,result){
       callback(err,result);
   })


    
}



function getUserById(data,callback){
  let values=[];
  const sql="select * from useram where email=? ";
  sqlConnection.executeQuery(sql,values,function(err,result){
  callback(err,result);
 })
}

 function otpInsert(data,callback){
    let values=[];
    values[0]=Number(data.id);
    values[1]=Number(data.otp);
    console.log("from otpInsert",values);
    const sql="insert into otpLogin (id,otp) values (?,?)";

 sqlConnection.executeQuery(sql,values,function(err,result){
        
 callback(err,result);
})




 }

function otpcheck(data,callback){
   let values=data.otp;
   console.log("from otpInsert",values);
   const sql="select id, fname,lname,email,CreatedTime,Phone   from otpLogin natural join useram where otp= ?";

   sqlConnection.executeQuery(sql,values,function(err,result){
        
    callback(err,result);
})



}


function InsertDriversAvailabitlity(data,callback){
    let values=data.Email;
    console.log(data);
    console.log("from Insert Drivers  Avialbility modal",values);
    const sql="select id from useram where email=?";
   
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
        
        callback(err,result);
    })
}


module.exports={CreateUser,getAllUsers,usercheck,getUserById,loginCheck,otpInsert,otpcheck,InsertDriversAvailabitlity,UpdateDriversAvailabilty,driverOffersList};