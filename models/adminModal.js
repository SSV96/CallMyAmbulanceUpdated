const sqlConnection= require("../services/sqlConnection");



function truncateAll(callback){
                    
    let values=[];
    const sql="truncate table  otpLogin";
    sqlConnection.executeQuery(sql,values,function(err,result){
        
        callback(err,result);
    })

}

module.exports={truncateAll};