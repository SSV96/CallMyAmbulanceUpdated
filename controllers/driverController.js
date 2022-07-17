const DriverModal = require("../models/driverModal");
const jwt = require("../services/jwtAuth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function DriverSignup(req, res) {
  res.render("../views/driver/driverSignup.ejs");
}

function DriverLogin(req, res) {
  res.render("../views/driver/Driverlogin.ejs");
}

function createNewDriver(req, res) {
  let data = req.body;
  console.log("from driver Controller cre new Driver", data);
  DriverModal.usercheck(data, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(100);
    }
    console.log(result.length);
    if (result == 0) {
      console.log("user doesnt exist"); //hashing
      bcrypt.hash(data.password, saltRounds).then(function (hash) {
        // Store hash in your password DB.
        data.password = hash;
        DriverModal.CreateUser(data, function (err, result) {
          console.log(" from result", result);
          // console.log(data," from create user");
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Unable to Insert",
              success: false,
            });
          }

          DriverModal.InsertDriversAvailabitlity(data, function (err, result1) {
            if (err) {
              console.log("Unable to Insert status of  Availability", err);
            } else {
              console.log("successfullly inserted into Availability", result1);
            }
          });
          return res.status(200).render("../views/driver/Driverlogin.ejs");
        });
      });
    } else {
      console.log("user already exists");
      return res.render("failure");
    }
  });
}

function DriverloginAuthentication(req, res) {
  let data = req.body;

  DriverModal.loginCheck(data, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      console.log(result);
      let hash = result[0].PASSWORD;

      bcrypt.compare(data.password, hash).then(function (result1) {
        DriverModal.UpdateDriversAvailabilty(
          { available: "YES", id: result[0].id },
          (err2, result2) => {
            if (err) {
              console.log(err);
              res.status(400).send({
                message:
                  "ERROR IN UPDATING THE DRIVERS AVAILABILITY STATUS AFTER LOGIN",
              });
            }
          }
        );
        //token
        const token = jwt.generateAccessToken(result[0].email);
        res.status(200).render("../views/driver/DriverloginPage", { result });
      });
    } else {
      console.log("user not found");
      return res.render("failure");
    }
  });
}

function getUsers(req, res) {
  DriverModal.getAllUsers(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Unable to Get details",
        success: false,
      });
    }
    console.log(result);
    return res.status(200).render("getusers", { result });
  });
}

function driverStatusUpdate(req, res) {
  let data = req.body;
  console.log("from driver Update", data);
  DriverModal.UpdateDriversAvailabilty(data, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).render("queryErrors", { error: err });
    }
    return res.status(200).send({
      message: "Successfully updated the status of driver ",
      success: true,
      data: result,
    });
  });
}

function driveroffersList(req, res) {
  let data = req.body;
  console.log("Enter into Offers Controller", data);
  DriverModal.driverOffersList(data, function (err, result) {
    if (err) {
      console.log(err);
    }
    return res.status(200).send({
      message: "Successfully Got the Offers",
      success: true,
      data: result,
    });
  });
}

function driverAccepteOffer(req, res) {
  let data = req.body;
  console.log("From Driver Accepted Controller", data);
  DriverModal.AcceptOffer(data, function (err, result) {
    if (err.err1 || err.err) {
      console.log(err);
      return res
        .status(400)
        .send({
          message: "errrors in Query",
          success: false,
        })
        .render("../views/ErrorPages/queryErrors.ejs", { error: err });
    }
    return res.status(200).send({
      message: "Successfully Updated reterived required Details",
      success: true,
      data: result,
    });
  });
}

function driverRejectedOffer(req, res) {
  let data = req.body;
  console.log("From Driver Rejected Controller", data);
  DriverModal.rejectOffer(data, function (err, result) {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .send({
          message: "errrors in Query",
          success: false,
        })
        .render("../views/ErrorPages/queryErrors.ejs", { error: err });
    }
    return res.status(200).send({
      message: "Successfully Updated reterived required Details",
      success: true,
      data: result,
    });
  });
}

function driverCompletedoffer(req, res) {
  let data = req.body;
  console.log("From Driver Completed Controller", data);
  DriverModal.driverCompletedOffer(data, function (err, result) {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .send({
          message: "errrors in Query",
          success: false,
        })
        .render("../views/ErrorPages/queryErrors.ejs", { error: err });
    }
    return res.status(200).send({
      message: "OFFERCOMPLETED ",
      success: true,
      data: result,
    });
  });
}

module.exports = {
  createNewDriver,
  getUsers,
  DriverSignup,
  DriverloginAuthentication,
  DriverLogin,
  driverStatusUpdate,
  driveroffersList,
  driverAccepteOffer,
  driverRejectedOffer,
  driverCompletedoffer,
};
