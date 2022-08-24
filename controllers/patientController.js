const PatientModal = require("../models/patientModal.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("../services/jwtAuth");

exports.SignupPage = (req, res) => {
  console.log(__dirname);
  res.render(`../views/patient/patientSignup`);
};

exports.CreatePatient = (req, res) => {
  let data = req.body;

  console.log("from cre patient", data);

  PatientModal.CreatePatient(data, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .render("../views/ErrorPages/queryErrors.ejs", { error: err });
    }

    return res.status(200).render("../views/patient/patientLogin");
  });
};

exports.PatientLogin = (req, res) => {
  res.render("../views/patient/patientLogin");
};

exports.PatientLoginPage = (req, res) => {
  let data = req.body;

  PatientModal.PatientLoginCheck(data, (err, result) => {
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
};

//Ambulance Booking

exports.AmbulanceBooking = (req, res) => {
  res.render("../views/patient/booking");
};

exports.AmbulanceBookingConform = (req, res) => {
  console.log("See", req);
  let data = req.body;
  console.log(data);
  PatientModal.AmbulanceBookingRequest(data, (err, result) => {
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
};

exports.getBookingsbyID = (req, res) => {
  let data = req.body;
  PatientModal.getBookingsById(data, (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).send({
      message: "success get  Bookings By ID",
      success: true,
      data: result,
    });
  });
};

exports.getCurrentBookings = (req, res) => {
  let data1 = req.body;
  console.log("from getBooking", data1);
  PatientModal.getcurrentBookingByID(data1, (err, result) => {
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
};

exports.InsertOffers = async (req, res) => {
  let data = req.body;
  console.log("Offers Controller", data);

  PatientModal.Insertoffers(data, (err, result) => {
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
};

exports.getAllPatients = async (req, res) => {
  let data = [];

  PatientModal.getPatients(data, (err, result) => {
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
};
