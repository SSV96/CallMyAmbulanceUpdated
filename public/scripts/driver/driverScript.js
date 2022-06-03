const availability=document.querySelectorAll('.Driversavailabilty');
console.log("from Availbity",availability);
const DriverId=document.querySelector('.driverID').textContent;
const bookingDetails=document.querySelectorAll('.BookingDetails');
const patientConformDetails=document.querySelectorAll('.patientDetails');
const bookingConformDetails=document.querySelectorAll('.BookingConformDetails');
let timeOUTfor10sec;
let bookingDetailsForDB;

availability[0].addEventListener('click',()=>{
     let status;
    if(availability[0].checked==true){
         availability[1].innerHTML="Online";
         console.log("Online checked");
         status={id:DriverId,available:"YES"};
          MyOffers();
         }
    else{
         clearTimeout(timeOUTfor10sec);
         clearFilelds();
         availability[1].innerHTML="Offline";
         console.log("unchecked");
         status={id:DriverId,available:"NO"};
        }
        driverAvailabilityStatusUpdate(status);
})


async function driverAvailabilityStatusUpdate(status){

     const response = await fetch('/driver/DriverStatus/update',{
                      "method":"post",
                      "headers":{
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json',
                                },
                      "body":JSON.stringify(status) 
                    })
}





 async function MyOffers(){



     console.log("Entered js OFFERS")
     const  offersResponse = await fetch('/driver/DriverOffers',
     {
      "method":"post",
       
       headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                },
        "body":JSON.stringify({id:DriverId}) 
     });

  const    currentOffers= await  offersResponse.json();// itself is a promise

           console.log(currentOffers.data);
           console.log("From Script My Offers",currentOffers.data[0]);
          

          
          if(currentOffers.data[0]){
               document.querySelector('.Offers').textContent="Current Offer";
               bookingDetailsForDB = currentOffers.data[0];
               let detailsArr=[currentOffers.data[0].pickuppoint,currentOffers.data[0].droppingpoint,currentOffers.data[0].distance,currentOffers.data[0].fare];
               let i=0;    
               bookingDetails.forEach(Element=>{
               Element.innerHTML=detailsArr[i++];
               
               })
   
}
 else{
      document.querySelector('.Offers').textContent="CURRENTLY NO OFFERS";
      if(availability[0].checked==true){
      timeOUTfor10sec=setTimeout(MyOffers, 10000);
      }
    }
 }


async function ConformOffer(){
      
     let response= await fetch('/driver/DriverAcceptedOffer',{"method":"post",headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },"body":JSON.stringify({
               driver_id:DriverId,
               booking_Id:bookingDetailsForDB.idBookings,
               patientId:bookingDetailsForDB.patientid
            }) 
          })
         const receivedResponse = await response.json();
         const PatientDetails=receivedResponse.data.result2[0];
         const patientData = [  PatientDetails.id, PatientDetails.name, PatientDetails.Phone];  
         const bookingData=[bookingDetailsForDB.pickuppoint,bookingDetailsForDB.droppingpoint,bookingDetailsForDB.fare];
         let i=0;
        patientConformDetails.forEach(Element=>{
               
               Element.textContent=patientData[i++];
          })
         i=0;
        bookingConformDetails.forEach(Element=>{
          Element.textContent=bookingData[i++];
        })
          
}



async function rejectOffer(){

     let response= await fetch('/driver/DriverRejectedOffer',{"method":"post",headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },"body":JSON.stringify({
               driver_id:DriverId,
               booking_Id:bookingDetailsForDB.idBookings,
               patientId:bookingDetailsForDB.patientid
            }) 
          })
    clearFilelds();      
   //MyOffers();


}

function clearFilelds(){
     bookingDetails.forEach(Element=>{
          Element.innerHTML=" ";
     })
     patientConformDetails.forEach(Element=>{
          Element.innerHTML=" ";
     })
     bookingConformDetails.forEach(Element=>{
          Element.innerHTML=" ";
     })
}

 function main(){
     if(availability[0].checked==true){
       MyOffers();
     }
     console.log("main Called");
 }   
main();