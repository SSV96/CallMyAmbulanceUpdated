require ('dotenv').config();


module.exports={

    mysql:{
       prod:{
           host:process.env.host,
           user:process.env.user,
           password:process.env.password,
           database:process.env.database
           
       }
    }
}