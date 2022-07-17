const adminModal = require("../models/adminModal");

function getAllDrivers(req, res) {
  adminModal.getAllDrivers(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status(200).send(result);
  });
}

function getAllOffers(req, res) {
  adminModal.getAllOffers(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status.send(result);
  });
}

function getAllPatient(req, res) {
  adminModal.getAllPatient(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status(200).send({
      message: "Successfully executed yes ",
      result,
    });
  });
}

function getBooking(req, res) {
  adminModal.getAllBookings(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status.send({ result });
  });
}

module.exports = {
  getAllDrivers,
  getBooking,
  getAllPatient,
  getAllOffers,
};
