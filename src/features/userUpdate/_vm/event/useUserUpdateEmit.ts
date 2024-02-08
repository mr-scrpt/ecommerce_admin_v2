import { useSocket } from "@/shared/lib/socket";

export const useEmitUserUpdate = () => {
  const socket = useSocket();

  return {
    userUpdateEvent: () => {
      console.log("output_log: emit update =>>>");
      socket.emit("user-update");
    },
  };
};
