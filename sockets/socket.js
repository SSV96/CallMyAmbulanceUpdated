module.exports = function (io) {
  let users = [];

  io.on("connection", (socket) => {
    users.push(socket.id);
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
      users.length = 0;
    });

    socket.on("patient-booking", (msg) => {
      io.emit("send-data-to-all-Drivers", msg);
      console.log("form server", msg);
    });

    socket.on("driverConformedOffer", (msg) => {
      console.log("data received", msg);
      io.emit("sendDriverData", msg);
    });

    console.log("INSIDE SOCKET", users);
  });
};
