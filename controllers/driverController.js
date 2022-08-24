const DriverModal = require("../models/driverModal");
const jwt = require("../services/jwtAuth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.DriverSignup = (req, res) => {
  res.render("../views/driver/driverSignup.ejs");
};
exports.DriverLogin = (req, res) => {
  res.render("../views/driver/Driverlogin.ejs");
};

// Creating A Driver

exports.createNewDriver = async (req, res) => {
  let data = req.body;
  let data1 = data.password;
  console.log("create DriverHere", data);
  await bcrypt.hash(data.password, saltRounds).then(function (hash) {
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

      DriverModal.loginCheck(data, function (err, result2) {
        if (err) {
          console.log(err);
        }
        if (result2.length) {
          console.log(result);
          let hash = result2[0].PASSWORD;

          bcrypt.compare(data1, hash).then(function (result12) {
            if (result12 == true) {
              DriverModal.UpdateDriversAvailabilty(
                { available: "YES", id: result2[0].id },
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
              const token = jwt.generateAccessToken(result2[0].email);

              res
                .cookie("Jwt", token)
                .status(200)
                .render("../views/driver/DriverloginPage", { result2 });
            } else {
              res.status(200).send("<h1>INcoorect Password</h1>");
            }
          });
        }
      });

      //
    });
  });
};

exports.DriverloginAuthentication = (req, res) => {
  let data = req.body;
  console.log(data, "from LOgin Modal");
  DriverModal.loginCheck(data, function (err, result2) {
    if (err) {
      console.log(err);
    }
    if (result2.length) {
      console.log(result2);
      let hash = result2[0].PASSWORD;

      bcrypt.compare(data.password, hash).then(function (result1) {
        if (result1 == true) {
          DriverModal.UpdateDriversAvailabilty(
            { available: "YES", id: result2[0].id },
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
          const token = jwt.generateAccessToken(result2[0].email);

          res
            .cookie("Jwt", token)
            .status(200)
            .render("../views/driver/DriverloginPage", { result2 });
        } else {
          res.status(200).send("<h1>INcoorect Password</h1>");
        }
      });
    } else {
      console.log("user not found");
      return res.render("failure");
    }
  });
};

exports.getUsers = (req, res) => {
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
};

exports.driverStatusUpdate = (req, res) => {
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
};

exports.driveroffersList = (req, res) => {
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
};

exports.driverAccepteOffer = (req, res) => {
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
};

exports.driverRejectedOffer = (req, res) => {
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
};

exports.driverCompletedoffer = (req, res) => {
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
};
