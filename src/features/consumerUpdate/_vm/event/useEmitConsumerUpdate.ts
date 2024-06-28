import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitConsumerUpdate = () => {
  const socket = useSocket();

  return {
    userUpdateEvent: (userId: string) => {
      socket.emit(WSEventEnum.USER_UPDATE, userId);
    },
  };
};
