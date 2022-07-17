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

  // console.log("from  object ",bookingOBJ);

  // let response = fetch('/patient/bookingSubmit',{"method":"post",headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  //   },"body":JSON.stringify(bookingOBJ) }).then(data2=>{
  //   return data2.json()
  //   }).then(post=>{
  //     console.log("first",post);
  //      bookingDetails=post.responde.r2;
  //      bookingStatus.forEach(element => {
  //      element.classList.toggle('hidden');});
  //     }).then(dat=>{
  //       let InsertOffers = fetch('/patient/searchingfordrivers',{"method":"post",headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       },"body":JSON.stringify(bookingDetails) })

  //     return InsertOffers;
  //     }).then(post2=>{return post2.json()}).then(
  //       post3=>{
  //         console.log("finaly got",post3)
  //       })

  //       let searchingforDrivers=fetch('/patient/searchingfordrivers',{"method":"post",headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         },"body":JSON.stringify(bookingDetails) }).then(data5=>{

  // })
});

socket.on("sendDriverData", (msg) => {
  console.log("msg", msg);
  setDriverDetails(msg);
});

function logout() {
  fetch("/logout", { method: "get" });
}

function setDriverDetails(msg) {
  driverDetails.forEach((element) => {
    element.textContent = msg[i++];
  });
}
