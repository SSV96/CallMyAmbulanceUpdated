module.exports = function (io) {
  let users = [];

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("patient-booking", (msg) => {
      io.emit("send-data-to-all-Drivers", msg);
      users.push(`${socket.id}room`);
      socket.join(`${socket.id}room`);
      console.log("form server", msg);
    });

    socket.on("driverConformedOffer", (msg) => {
      //here we can make room

      socket.join(users[0]);

      socket.broadcast.emit("offer-expired");

      io.to(users[0]).emit("room-join-conformation");
      console.log("data received", msg);
      io.emit("sendDriverData", msg);
      console.log(users);
    });

    console.log("INSIDE SOCKET", users);
  });
};
