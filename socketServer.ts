import { Server as SocketIOServer } from "socket.io";
import { Server } from "http";

export const initSocketServer = (server: Server) => {
  const io = new SocketIOServer(server, {
    path: "/socket.io",
    cors: {
      origin: process.env.ORIGIN?.split(",") || [],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("notification", (data) => {
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });

  return io;
};
