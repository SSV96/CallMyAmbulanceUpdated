exports.sms = (username, otp, phone) => {
  var unirest = require("unirest");

  var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

  req.query({
    authorization:
      "8eo9FdL3Z6zW4jGlKxbrQBUDPINsvT1mfh5igRpqkyuV7XAwnCLUpgczdYZBF0XiG8ME9o3jus6mRltT",
    message: `Hello ${username} is ${otp} `,
    language: "english",
    route: "q",
    numbers: "8096843678",
  });

  req.headers({
    "cache-control": "no-cache",
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });
};
