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

  //      console.log("Entered js OFFERS")
  //      const  offersResponse = await fetch('/driver/DriverOffers',
  //      {
  //       "method":"post",

  //        headers: {
  //                  'Accept': 'application/json',
  //                  'Content-Type': 'application/json'
  //                 },
  //         "body":JSON.stringify({id:DriverId})
  //      });

  //   const  currentOffers= await  offersResponse.json();// itself is a promise

  //            console.log(currentOffers.data);
  //            console.log("From Script My Offers",currentOffers.data[0]);

  //           if(currentOffers.data[0]){
  //                document.querySelector('.Offers').textContent="Current Offer";
  //                bookingDetailsForDB = currentOffers.data[0];
  //                let detailsArr=[currentOffers.data[0].pickuppoint,currentOffers.data[0].droppingpoint,currentOffers.data[0].distance,currentOffers.data[0].fare];
  //                let i=0;
  //                bookingDetails.forEach(Element=>{
  //                Element.innerHTML=detailsArr[i++];

  //                })

  // }
  //  else{
  //       document.querySelector('.Offers').textContent="CURRENTLY NO OFFERS";
  //       if(availability[0].checked==true){
  //       timeOUTfor10sec=setTimeout(MyOffers, 10000);
  //       }
  //     }
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

  bookingConformDetails[0].textContent = bookingINFO.SOURCE;
  bookingConformDetails[1].textContent = bookingINFO.DESTINATION;

  bookingConformDetails[2].textContent = bookingINFO.FARE;

  patientConformDetails[0].textContent = patientINFO.ID;
  patientConformDetails[1].textContent = patientINFO.NAME;
  patientConformDetails[2].textContent = patientINFO.PHONE;

  //
  socket.emit("driverConformedOffer", driverDetailsdata);

  // let response= await fetch('/driver/DriverAcceptedOffer',{"method":"post",headers: {
  //      'Accept': 'application/json',
  //      'Content-Type': 'application/json',
  //      },"body":JSON.stringify({
  //           driver_id:DriverId,
  //           booking_Id:bookingDetailsForDB.idBookings,
  //           patientId:bookingDetailsForDB.patientid
  //        })
  //      })
  //     const receivedResponse = await response.json();
  //     const PatientDetails=receivedResponse.data.result2[0];
  //     const patientData = [  PatientDetails.id, PatientDetails.name, PatientDetails.Phone];
  //     const bookingData=[bookingDetailsForDB.pickuppoint,bookingDetailsForDB.droppingpoint,bookingDetailsForDB.fare];
  //     let i=0;
  //    patientConformDetails.forEach(Element=>{

  //           Element.textContent=patientData[i++];
  //      })
  //     i=0;
  //    bookingConformDetails.forEach(Element=>{
  //      Element.textContent=bookingData[i++];
  //    });
}

async function rejectOffer() {
  // let response= await fetch('/driver/DriverRejectedOffer',{"method":"post",headers: {
  //      'Accept': 'application/json',
  //      'Content-Type': 'application/json',
  //      },"body":JSON.stringify({
  //           driver_id:DriverId,
  //           booking_Id:bookingDetailsForDB.idBookings,
  //           patientId:bookingDetailsForDB.patientid
  //        })
  //      })
  clearFilelds();
  //MyOffers();
}

function clearFilelds() {
  const arr = [bookingDetails, patientConformDetails, bookingConformDetails];

  arr.forEach((element) => {
    element.forEach((innnerElement) => {
      innnerElement.innerHTML = " ";
    });
  });
}

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
