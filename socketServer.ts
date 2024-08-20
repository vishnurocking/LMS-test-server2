import { Server as SocketIOServer } from "socket.io";
import { Server } from "http";

export const initSocketServer = (server: Server) => {
  const io = new SocketIOServer(server, {
    path: "/socket.io",
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? "https://gouris.com"
          : ["http://localhost:3000", "http://127.0.0.1:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Listen for 'notification' event from the frontend
    socket.on("notification", (data) => {
      // Broadcast the notification data to all connected clients (admin dashboard)
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });

  return io;
};
