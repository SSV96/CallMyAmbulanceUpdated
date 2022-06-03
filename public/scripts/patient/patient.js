let patientID=document.querySelector(".Patientid").textContent;
const bookingStatus=document.querySelectorAll('.BookingStatus');
let bookingDetails;
console.log("from",patientID);


const Booking=document.querySelectorAll('.BookingDetails');

let BookingOBJ={id:patientID};

let currentBooking =document.querySelector(".currentBooking");

function calculateFare(){
  document.querySelector('.fareDisplay').innerHTML=50 * Number(document.querySelector(".distanceUnits").value);
}

function book(){
  let a=0;
  Booking.forEach(element=>{
 
   BookingOBJ[`Attribute${a}`]=element.value|| element.textContent;
   a++;
 });

 console.log("from  object ",BookingOBJ);

  let response = fetch('/patient/bookingSubmit',{"method":"post",headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },"body":JSON.stringify(BookingOBJ) }).then(data2=>{
    return data2.json()
    }).then(post=>{
      console.log("first",post);
       bookingDetails=post.responde.r2;
       bookingStatus.forEach(element => {
       element.classList.toggle('hidden');});
      }).then(dat=>{
        let InsertOffers = fetch('/patient/searchingfordrivers',{"method":"post",headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },"body":JSON.stringify(bookingDetails) })
      
      return InsertOffers;
      }).then(post2=>{return post2.json()}).then(
        post3=>{
          console.log("finaly got",post3)
        })

        let searchingforDrivers=fetch('/patient/searchingfordrivers',{"method":"post",headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },"body":JSON.stringify(bookingDetails) }).then(data5=>{
            
          })
  
  
  
  
  
  
    }




//
