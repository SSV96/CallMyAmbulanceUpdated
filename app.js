require("dotenv").config();
const express = require("express");
const admin = require("./models/adminModal");
const cookieParser = require("cookie-parser");
const creUser = require("./models/driverModal");
const bodyParser = require("body-parser");
const { json } = require("express/lib/response");
var nodemailer = require("nodemailer");

const morgan = require("morgan"); // JUST FOR LOGS
const session = require("express-session"); // for sessions

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//routes

const DriverRoute = require("./routes/driverRoute");
const PatientRoute = require("./routes/patientRoute");
const adminRoute = require("./routes/adminRoute");

// Express initializes app to be a function handler

const app = express();
app.use(express.json());
app.use(cookieParser());

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// Middlewares

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//   Routers

app.use("/driver", DriverRoute);

app.use("/patient", PatientRoute);

app.use("/admin", adminRoute);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/logout", (req, res) => {
  console.log("Logout hit suceesfullt");
  res.clearCookie("jwt").redirect("/");
});

require("./sockets/socket")(io);

server.listen(process.env.PORT || 3000, function () {
  console.log("server running at port 3000");
  console.log("");
});
