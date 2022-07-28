const comonModal = require("../models/commonModal");

exports.Check_Email_OR_PhoneExists = (req, res, next) => {
  const data = req.body;
  comonModal.loginCheck(data, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        success: true,
        message: "something went wrong in Database",
        err,
      });
    }

    if (result.length) {
      console.log(result);
      console.log("user already exists");
      let exists;
      if (data.email == result[0].email) {
        exists = "Email ";
        if (data.phone == result[0].phone) {
          exists = exists + "  Phone ";
        }
      }

      return res.status(200).send({
        success: true,
        userExists: true,
        message: `A user with Given ${exists} Already Exists`,
      });
    } else {
      console.log("Phone or Email Doesnt Exists");
      next();
    }
  });
};
