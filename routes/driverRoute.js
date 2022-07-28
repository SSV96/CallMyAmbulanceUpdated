const express = require("express");
const DriverController = require("../controllers/driverController");
const generate_OTP = require("../services/sms");
const router = express.Router();
const commonConroller = require("../controllers/commonController");
const bcrypt = require("bcrypt");
router.get("/DriverSignup", DriverController.DriverSignup);

router.post(
  "/checkCredentials",
  [commonConroller.Check_Email_OR_PhoneExists],
  async (req, res) => {
    const obj = req.body;
    const otp = Math.floor(Math.random() * 100000);
    obj.otp = otp;
    console.log("From", obj);
    console.log(otp);
    let otpKEY;

    await bcrypt.hash(`${otp}`, 8).then(function (hash) {
      // Store hash in your password DB.

      otpKEY = hash;
      console.log(otpKEY);
    });

    let responeFromSmsServer = generate_OTP.generateOTP(obj);
    console.log("Fromm Sms", responeFromSmsServer);
    res.status(200).send({
      success: true,
      message: "Successfully send OTP",
      otpKEY,
      userExists: false,
      response: responeFromSmsServer,
    });
  }
);

router.post("/otpCheck", async (req, res) => {
  const data = req.body;
  console.log("API HItting");
  console.log(data);
  let result1 = await bcrypt.compare(`${data.otp_entered}`, `${data.hash}`);

  console.log("hitting", result1);
  if (result1 == true) {
    console.log("OTP is Correct Phone Number is verified ");
    return res.status(200).send({
      success: true,
      otp: true,
      message: "Correct OTP",
    });
  } else {
    console.log("Incorrect OTP");
    return res.status(200).send({
      success: true,
      otp: false,
      message: "Incorrect OTP",
    });
  }
});

router.post("/CreateNewDriver", DriverController.createNewDriver);
router.get("/Driverlogin", DriverController.DriverLogin);

router.post("/DriverLoginPage", DriverController.DriverloginAuthentication);

router.post("/DriverStatus/update", DriverController.driverStatusUpdate);

router.post("/DriverOffers", DriverController.driveroffersList);

router.post("/DriverAcceptedOffer", DriverController.driverAccepteOffer);

router.post("/DriverRejectedOffer", DriverController.driverRejectedOffer);

router.post("/driverCompletedRide", DriverController.driverCompletedoffer);

module.exports = router;
