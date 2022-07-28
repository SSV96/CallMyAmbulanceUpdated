require("dotenv").config();

var unirest = require("unirest");

var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

exports.generateOTP = (obj) => {
  req.query({
    authorization: process.env.SMS_KEY,
    route: "v3",
    sender_id: "FTWSMS",
    message: `Hello ${obj.user_name} your otp for registration of Call My Ambulance APP is  ${obj.otp}`,
    language: "english",
    numbers: obj.phone,
  });

  req.headers({
    "cache-control": "no-cache",
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
    return res.body;
  });
};
