import { Server } from "socket.io";

export const socketServer = new Server(3334, {
  cors: {
    origin: "*",
  },
});
