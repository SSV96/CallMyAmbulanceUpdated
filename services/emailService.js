const sgMail = require("@sendgrid/mail");

const sendGridAPIKey = "";

sgMail.setApiKey(sendGridAPIKey);

const html = `<></>`;

sgMail
  .send({
    to: "sathyaswaroopvandavasi@gmail.com",
    from: "sathyaswaroopvandavasi@gmail.com",

    subject: "TEST",
    html: `<h1>Hello sathya</h1>`,
  })
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.log(error);
  });
