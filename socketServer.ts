import { Server as SocketIOServer } from "socket.io";

export const initSocketServer = (io: SocketIOServer) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Handle notification event
    socket.on("notification", (data) => {
      io.emit("newNotification", data);
    });

    // Handle custom events
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("leaveRoom", (roomId: string) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    });

    socket.on("sendMessage", (data: { room: string; message: string }) => {
      io.to(data.room).emit("newMessage", {
        user: socket.id,
        message: data.message,
      });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });

    // Error handling
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  // Error handling for the io instance
  io.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

  return io;
};
