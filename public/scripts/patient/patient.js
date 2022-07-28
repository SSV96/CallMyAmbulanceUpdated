//Patient Details
const patientdetailsINFORMATION = document.querySelectorAll(".PatientDetails");

const bookingStatus = document.querySelectorAll(".BookingStatus");

const driverDetails = document.querySelectorAll(".DriverDetails");

let i = 0;

let bookingDetails = {};

let patientDetails = {};

const Booking = document.querySelectorAll(".BookingDetails");

let bookingOBJ = {};

let currentBooking = document.querySelector(".currentBooking");

var socket = io();

function calculateFare() {
  document.querySelector(".fareDisplay").innerHTML =
    50 * Number(document.querySelector(".distanceUnits").value);
}

document.querySelector(".bookingButton").addEventListener("click", (e) => {
  e.preventDefault();

  let a = 0;
  const bookingDetailsTemplate = ["SOURCE", "DESTINATION", "DISTANCE", "FARE"];
  Booking.forEach((element) => {
    bookingOBJ[`${bookingDetailsTemplate[a]}`] =
      element.value || element.textContent;
    a++;
  });
  console.log("Entered booking", bookingOBJ);
  a = 0;
  const patientDetailsTemplate = ["ID", "NAME", "GMAIL", "PHONE"];

  patientdetailsINFORMATION.forEach((element) => {
    patientDetails[`${patientDetailsTemplate[a]}`] =
      element.value || element.textContent;

    a++;
  });

  console.log("Patient INFORMATION", patientDetails);

  socket.emit("patient-booking", {
    bookingINFO: bookingOBJ,
    patientINFO: patientDetails,
  });
});

socket.on("sendDriverData", (msg) => {
  console.log("msg", msg);
  //Calling function to set Driver Data
  setDriverDetails(msg);
});

// Setting Driver data in the patient page
function setDriverDetails(msg) {
  driverDetails.forEach((element) => {
    element.textContent = msg[i++];
  });
}
