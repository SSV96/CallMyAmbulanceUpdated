require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

// Generating Jwt Token
function generateAccessToken(username) {
  console.log("from generate Token", username);
  const token = jwt.sign({ name: username }, secret);
  console.log(token);

  return token;
}

//Checking Jwt Token
function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  console.log("gettiing token", token, secret);
  const verify = jwt.verify(token, secret);
  console.log("username    ", verify.name);
  if (!token) {
    res.send({
      errorMessage: "YOU are not authenticated",
    });
  }
  next();
}

module.exports = {
  generateAccessToken,
  authenticateToken,
};
