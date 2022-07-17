const sqlConnection = require("../services/sqlConnection");

function truncateAll(callback) {
  let values = [];
  const sql = "truncate table  otpLogin";
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
}

function getAllDrivers(callback) {
  let values = [];
  const sql = "select * from Driver_INFO";
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
}

function getAllPatient(callback) {
  let values = [];
  const sql = "select * from patient";
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
}

function getAllOffers(callback) {
  let values = [];
  const sql = "select * from offers";
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
}

function getAllBookings(callback) {
  let values = [];
  const sql = "select * from Bookings";
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
}

module.exports = {
  truncateAll,
  getAllDrivers,
  getAllOffers,
  getAllPatient,
  getAllBookings,
};

// select * from AvailableDrivers;

// select * from Driver_INFO;

// select * from offers;

// select * from patient;
