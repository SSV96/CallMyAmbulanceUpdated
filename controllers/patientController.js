const PatientModal = require("../models/patientModal");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("../services/jwtAuth");

function SignupPage(req, res) {
  console.log(__dirname);
  res.render(`../views/patient/patientSignup`);
}

function CreatePatient(req, res) {
  let data = req.body;

  console.log("from cre patient", data);

  PatientModal.CreatePatient(data, function (err, result) {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .render("../views/ErrorPages/queryErrors.ejs", { error: err });
    }

    return res.status(200).render("../views/patient/patientLogin");
  });
}

function PatientLogin(req, res) {
  res.render("../views/patient/patientLogin");
}

function PatientLoginPage(req, res) {
  let data = req.body;

  PatientModal.PatientLoginCheck(data, function (err, result) {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .render("../views/ErrorPages/queryErrors.ejs", { error: err });
    }
    if (result.length > 0) {
      console.log("User Found");

      console.log("Patient ", result);

      return res
        .status(200)
        .render("../views/patient/patientLoginPage.ejs", { result });
    } else {
      console.log("user Not Found");
      return res.status(200).render("../views/patient/patientSignup");
    }
  });
}

//Ambulance Booking

function AmbulanceBooking(req, res) {
  res.render("../views/patient/booking");
}

function AmbulanceBookingConform(req, res) {
  console.log("See", req);
  let data = req.body;
  console.log(data);
  PatientModal.AmbulanceBookingRequest(data, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).render("../views/ErrorPages/queryErrors", { error: err });
    } else {
      res.status(200).send({
        message: "BOOking Confirmed",
        success: true,
        responde: result,
      });
    }
  });
}

function getBookingsbyID(req, res) {
  let data = req.body;
  PatientModal.getBookingsById(data, function (err, result) {
    if (err) {
      console.log(err);
    }
    return res.status(200).send({
      message: "success get  Bookings By ID",
      success: true,
      data: result,
    });
  });
}

function getCurrentBookings(req, res) {
  let data1 = req.body;
  console.log("from getBooking", data1);
  PatientModal.getcurrentBookingByID(data1, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("from getCurentBookings result", result);
    return res.status(200).send({
      message: "successfully retrieved get current Bookings",
      success: true,
      data: result,
    });
  });
}

function InsertOffers(req, res) {
  let data = req.body;
  console.log("Offers Controller", data);

  PatientModal.Insertoffers(data, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("from getCurentBookings result", result);
    return res.status(200).send({
      message: "successfully retrieved get current Bookings",
      success: true,
      data: result,
    });
  });
}

function getAllPatients(req, res) {
  let data = [];

  PatientModal.getPatients(data, function (err, result) {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .render("../views/ErrorPages/queryErrors.ejs", { error: err });
    }
    return res.status(200).send({
      message: "got data ",
      success: true,
      rows: result,
    });
  });
}

module.exports = {
  CreatePatient,
  SignupPage,
  getAllPatients,
  PatientLogin,
  PatientLoginPage,
  AmbulanceBooking,
  AmbulanceBookingConform,
  getBookingsbyID,
  getCurrentBookings,
  InsertOffers,
};
