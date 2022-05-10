const express =require('express');
const usrctrl=require('../controllers/userController');

let router =express.Router();

router.post("/send",usrctrl.createNewUser);

module.exports=router;