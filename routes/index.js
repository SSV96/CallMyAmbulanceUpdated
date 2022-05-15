const express =require('express');
const usrctrl=require('../controllers/userController');

let router =express.Router();

//router.post("/send",usrctrl.createNewUser);

router.get("/receive",usrctrl.getUsers);

module.exports=router;