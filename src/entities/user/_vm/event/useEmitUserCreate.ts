import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitUserCreate = () => {
  const socket = useSocket();

  return {
    userCreateEvent: () => {
      socket.emit(WSEventEnum.USER_CREATE);
    },
  };
};
