import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitUserUpdate = () => {
  const socket = useSocket();

  return {
    userUpdateEvent: () => {
      socket.emit(WSEventEnum.USER_UPDATE);
    },
  };
};
