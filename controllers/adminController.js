const adminModal = require("../models/adminModal");

exports.getAllDrivers = (req, res) => {
  adminModal.getAllDrivers((err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status(200).send(result);
  });
};

exports.getAllOffers = (req, res) => {
  adminModal.getAllOffers((err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status.send(result);
  });
};

exports.getAllPatient = (req, res) => {
  adminModal.getAllPatient((err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status(200).send({
      message: "Successfully executed yes ",
      result,
    });
  });
};

exports.getBooking = (req, res) => {
  adminModal.getAllBookings((err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    return res.status.send({ result });
  });
};
