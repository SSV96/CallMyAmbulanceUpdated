const express =require('express');
const DriverController=require('../controllers/driverController');

const router =express.Router();




router.get('/DriverSignup',DriverController.DriverSignup)

router.post("/createDriver",DriverController.createNewDriver);

router.get('/Driverlogin',DriverController.DriverLogin);

router.post('/DriverLoginPage',DriverController.DriverloginAuthentication)

router.post('/DriverLoginSuccess',DriverController.DriverLoginSuccessPage);

router.post('/DriverStatus/update',DriverController.driverStatusUpdate);

router.post('/DriverOffers',DriverController.driveroffersList);

module.exports=router;