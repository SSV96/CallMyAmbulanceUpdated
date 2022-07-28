const availability = document.querySelectorAll(".Driversavailabilty");
console.log("from Availbity", availability);

const bookingDetails = document.querySelectorAll(".BookingDetails");
const patientConformDetails = document.querySelectorAll(".patientDetails");
const bookingConformDetails = document.querySelectorAll(
  ".bookingConformDetails"
);

const driverDetails = document.querySelectorAll(".driverDetails");

const statusButtons = document.querySelectorAll(".StatusButtons");

let driverDetailsdata = [];

//let timeOUTfor10sec;
let bookingDetailsForDB;
let i = 0; //for increment;

//Socket
var socket = io();

availability[0].addEventListener("click", () => {
  let status;
  if (availability[0].checked == true) {
    availability[1].innerHTML = "Online";
    console.log("Online checked");
    // status={id:DriverId,available:"YES"};
    MyOffers();
  } else {
    //    clearTimeout(timeOUTfor10sec);
    clearFilelds();
    availability[1].innerHTML = "Offline";
    console.log("unchecked");
    //  status={id:DriverId,available:"NO"};
  }
  // driverAvailabilityStatusUpdate(status);
});

async function driverAvailabilityStatusUpdate(status) {
  const response = await fetch("/driver/DriverStatus/update", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  });
}

socket.on("send-data-to-all-Drivers", (msg) => {
  bookingDetailsForDB = msg;
  console.log("patient and Booking data", msg);
  MyOffers(msg);
});

// async
function MyOffers(msg) {
  const bookingdetails = msg.bookingINFO;

  console.log("Booking Details", bookingdetails.SOURCE);
  bookingDetailsValues = Object.values(bookingdetails);
  console.log(bookingDetailsValues);

  bookingDetails.forEach((Element) => {
    Element.innerHTML = bookingDetailsValues[i++];
  });

  statusButtons.forEach((element) => {
    element.classList.toggle("hidden");
  });
}

//use async
function ConformOffer() {
  i = 0;
  driverDetails.forEach((element) => {
    driverDetailsdata[i++] = element.value || element.textContent;
  });

  // BookingConformDetails
  // patientDetails

  const { bookingINFO, patientINFO } = bookingDetailsForDB;

  console.log("detaild", driverDetailsdata);
  driverDetailsdata.push(patientINFO);

  bookingConformDetails[0].textContent = bookingINFO.SOURCE;
  bookingConformDetails[1].textContent = bookingINFO.DESTINATION;

  bookingConformDetails[2].textContent = bookingINFO.FARE;

  patientConformDetails[0].textContent = patientINFO.ID;
  patientConformDetails[1].textContent = patientINFO.NAME;
  patientConformDetails[2].textContent = patientINFO.PHONE;

  //
  socket.emit("driverConformedOffer", driverDetailsdata);
  clearAcceptRejectButtons();
}

function clearAcceptRejectButtons() {
  statusButtons.forEach((element) => {
    element.classList.toggle("hidden");
  });
}

function rejectOffer() {
  clearAcceptRejectButtons();

  clearFilelds();
  clearAcceptRejectButtons();
}

function clearFilelds() {
  const arr = [bookingDetails, patientConformDetails, bookingConformDetails];

  arr.forEach((element) => {
    element.forEach((innnerElement) => {
      innnerElement.innerHTML = " ";
    });
  });
}

socket.on("room-join-conformation", () => {
  console.log("room joined");
});

socket.on("offer-expired", () => {
  console.log("Offer expired");
  clearFilelds();
});
async function driverCompletedRide() {
  let response = await fetch("/driver/driverCompletedRide", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      driver_id: DriverId,
      booking_Id: bookingDetailsForDB.idBookings,
      patientId: bookingDetailsForDB.patientid,
    }),
  });
  alert("Successfully Completed");
}

function getpreviousOffers() {}

function main() {
  if (availability[0].checked == true) {
    MyOffers();
  }
  console.log("main Called");
}
