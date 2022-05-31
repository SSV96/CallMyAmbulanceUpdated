const availability=document.querySelectorAll('.Driversavailabilty');
console.log("from Availbity",availability);
const DriverId=document.querySelector('.driverID').textContent;
const bookingDetails=document.querySelectorAll('.BookingDetails');

let bookingDetailsForDB;

availability[0].addEventListener('click',()=>{
    let status;
    if(availability[0].checked==true){
         availability[1].innerHTML="Online";
         console.log("Online checked");
         status={id:DriverId,available:"YES"};
         }
    else{
         availability[1].innerHTML="Offline";
         console.log("unchecked");
         status={id:DriverId,available:"NO"};
        }
    
let response = fetch('/driver/DriverStatus/update',{"method":"post",headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
   },"body":JSON.stringify(status) }).then(data2=>{
   return data2.json()
   }).then(data3=>{
    
   })
})



let response = fetch('/driver/DriverOffers',{"method":"post",headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     },"body":JSON.stringify({id:DriverId}) }).then(data2=>{
     return data2.json()
     }).then(data3=>{
      console.log(data3.data[0]);
      bookingDetailsForDB=data3.data[0];
      let detailsArr=[data3.data[0].pickuppoint,data3.data[0].droppingpoint,data3.data[0].distance,data3.data[0].fare];
       let i=0;    
       bookingDetails.forEach(Element=>{
              
          Element.innerHTML=detailsArr[i++];
      })
     })

function ConformOffer(){
       

}
    
   