const express=require('express');
const usrctrl=require('../controllers/driverController');
const router =express.Router();

router.get("/receive",usrctrl.getUsers);


module.exports=router;