const express= require('express');

const patientcontroller=require('../controllers/patientController');

const router=express.Router();



router.get("/patientSignup",patientcontroller.SignupPage);

router.post("/createPatient",patientcontroller.CreatePatient);

// Ambulance booking


router.get("/patientlogin",patientcontroller.PatientLogin);

router.post("/PatientLogin",patientcontroller.PatientLoginPage);


router.get("/AmbulanceBookingPage",patientcontroller.AmbulanceBooking)

router.post("/bookingSubmit",patientcontroller.AmbulanceBookingConform);

router.post("/getCurrentBookingDetails",patientcontroller.getCurrentBookings);

router.post("/patientDetailsbyId",patientcontroller.getBookingsbyID);

router.post('/searchingfordrivers',patientcontroller.InsertOffers);

//for Admin

router.get("/AllPatients",patientcontroller.getAllPatients);



module.exports=router;


