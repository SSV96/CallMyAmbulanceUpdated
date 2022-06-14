const express =require('express');
const DriverController=require('../controllers/driverController');

const router =express.Router();




router.get('/DriverSignup',DriverController.DriverSignup)

router.post("/createDriver",DriverController.createNewDriver);

router.get('/Driverlogin',DriverController.DriverLogin);

router.post('/DriverLoginPage',DriverController.DriverloginAuthentication)



router.post('/DriverStatus/update',DriverController.driverStatusUpdate);

router.post('/DriverOffers',DriverController.driveroffersList);


router.post('/DriverAcceptedOffer',DriverController.driverAccepteOffer);

router.post('/DriverRejectedOffer',DriverController.driverRejectedOffer);

router.post('/driverCompletedRide',DriverController.driverCompletedoffer);

module.exports=router;