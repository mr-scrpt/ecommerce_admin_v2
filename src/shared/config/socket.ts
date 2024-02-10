import { io } from "socket.io-client";

export const socketClient = (clientId?: string) =>
  io("ws://localhost:3334", {
    auth: {
      clientId,
    },
    autoConnect: false,
  });
