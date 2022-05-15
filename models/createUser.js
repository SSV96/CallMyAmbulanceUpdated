const sqlConnection= require("../services/sqlConnection");

function CreateUser(data,callback){
    let values=[];
     
     values[0]=data.FirstName;
     values[1]=data.LastName;
     values[2]=data.Email;
     values[3]=new Date();
     values[4]=data.password;

     console.log(values);
    const sql="insert into useram (fname,lname,email,CreatedTime,PASSWORD) values (?,?,?,?,?)";
    sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
    })

}

function getAllUsers(callback){
    let values=[];
    const sql="select id, fname,lname,email,CreatedTime from useram ";
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
    let  email = data.Email;
    let password =data.password;  
   let  values=[ email,password ]
   
    console.log("from ",values)
   const sql =" select * from useram where email = ? && password = ?";
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
   const sql="select id, fname,lname,email   from otpLogin natural join useram where otp= ?";

   sqlConnection.executeQuery(sql,values,function(err,result){
        
    callback(err,result);
})



}




module.exports={CreateUser,getAllUsers,usercheck,getUserById,loginCheck,otpInsert,otpcheck};