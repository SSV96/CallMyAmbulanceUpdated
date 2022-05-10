const sqlConnection= require("../services/sqlConnection");

function CreateUser(data,callback){
    let values=[];
     values[0]=data.FirstName;
     values[1]=data.LastName;
     values[2]=data.Email;
     console.log(values);
    const sql="insert into useram (fname,lname,email) values (?,?,?)";
    sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
    })

}

module.exports={CreateUser};