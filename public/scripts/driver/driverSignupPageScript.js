const otp_Click_btn = document.querySelector(".get-otp-btn");
const otp_Click_btn_div = document.querySelector(".get-otp-btn-div");
const userName = document.querySelector(".FirstName");
const userPhone = document.querySelector(".phone");
const user_input_Array = document.querySelectorAll(".user-input");
let verification_State;
let otp1;
let userObject = {};
const emailData = document.querySelector(".Email");
const text_element = `<div class="col-lg-6 col-md-12 p-3">
 <div class="form-floating">
<input
  type="text"
  class="form-control bottom otp-value"
  name="otp"
  placeholder="otp"
  required
/>
<label for="floatingInput">OTP</label>
</div>
</div>
`;
console.log("loaded");

async function generateOTP() {
  const validation = inputValidation();
  console.log("validation", validation);
  if (validation == 0) {
    console.log("All Fields Entered");
  } else {
    return 0;
  }

  if (otp_Click_btn.textContent === "Verify OTP") {
    console.log("entered");

    const otp_entered = document.querySelector(".otp-value").value;
    console.log(otp_entered, " hashed ", otp1);
    const check_OTP_From_Server = await fetch("/driver/otpCheck", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp_entered,
        hash: otp1,
      }),
    });
    const OtpStatus = await check_OTP_From_Server.json();
    if (OtpStatus.otp == true) {
      console.log("verified");
      document
        .querySelector(".needs-validation")
        .classList.add("was-validated");
      otp_Click_btn.classList.remove("btn-dark");
      otp_Click_btn.classList.replace("btn-primary", "btn-success");
      console.log("entered into submit");

      otp_Click_btn.textContent = "Verified click here to submit";

      otp_Click_btn.type = "submit";

      return;
    } else {
      if (document.querySelector(".otp-value").value == "") {
        alert("please Enter OTP");
      } else {
        alert("Wrong OTP Please try again");
        document.querySelector(".otp-value").value = " ";
      }
    }
  } else if (otp_Click_btn.textContent == "Verified click here to submit") {
    console.log("SUbmitted Data");
  } else {
    // when the user asks for otp , we are requesting server to  generate otp.
    const otpresponse = await fetch("/driver/checkCredentials", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailData.value,
        user_name: userName.value,
        otp: "otp",
        phone: userPhone.value,
        table: "Driver_INFO",
      }),
    });
    const data = await otpresponse.json();
    // checking response we got
    console.log(data);
    //we saving otp
    otp1 = data.otpKEY;
    // otp_Click_btn.insertAdjacentHTML("beforebegin", text_element);
    if (data.userExists == false) {
      otp_Click_btn_div.insertAdjacentHTML("beforebegin", text_element);
      otp_Click_btn.textContent = "Verify OTP";
      otp_Click_btn.classList.add("btn-dark");
      return;
    } else {
      alert(data.message);
      return;
    }
  }
}

function inputValidation() {
  // const user_input_Array = document.querySelectorAll(".user-input");
  const node_length = user_input_Array.length;
  console.log("user input", user_input_Array);
  for (let i = 0; i < node_length; i++) {
    if (user_input_Array[i].value == "") {
      alert(`Plase Enter  ${user_input_Array[i].name}`);
      console.log("enteres");
      return 1;
    }
  }
  return 0;
}
function disbleAllButtons() {
  for (let i = 0; i < user_input_Array.length; i++) {
    user_input_Array[i].disabled = true;
  }
  document.querySelector(".otp-value").disabled = true;
}
