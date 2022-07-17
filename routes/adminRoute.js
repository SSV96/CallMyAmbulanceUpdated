const express = require("express");
const admnCtrl = require("../controllers/adminController");
const router = express.Router();
const jwt = require("../services/jwtAuth");
//router.get("/receive",usrctrl.getUsers);
const validator = require("../services/validator");

// To get admin Login Page
router.get("/adminLogin", (req, res) => {
  res.render("../views/admin/adminLogin");
});

// To get Admin Login HomePage
router.post(
  "/admin/adminLoggedIN",
  [validator.email_validation],
  (req, res) => {
    const token = jwt.generateAccessToken(req.body.email);

    res
      .cookie("jwt", token, { expire: new Date() + 4545 })
      .header({ jwt: token })
      .render("../views/admin/adminLoginPage.ejs", { email: req.body.email });
  }
);

//Testing auth
router.get("/getAllDrivers", jwt.authenticateToken, admnCtrl.getAllDrivers);

router.get("/getBooking");

router.get("/getAllPatient", jwt.authenticateToken, admnCtrl.getAllPatient);

router.get("/getAllOffers");

module.exports = router;
