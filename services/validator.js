var validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

exports.email_validation = (req, res, next) => {
  console.log(req.body);
  let data = req.body.email;
  if (isEmail(data)) {
    next();
    return;
  }
  return res.status(403).send({ message: "Invalid Email" });
};
