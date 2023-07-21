const socket = require("socket.io");

// io.on("connection", (socket) => {
//   socket.emit("me", socket.id);
// });

exports.Stream = async (server) => {
  console.log("Stream me hu mai!!");

  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    console.log("socket", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      console.log("user", userToCall, "from", from, "name", name);
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });
};
