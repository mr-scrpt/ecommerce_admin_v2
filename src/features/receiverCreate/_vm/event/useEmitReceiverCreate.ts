import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitReceiverCreate = () => {
  const socket = useSocket();

  return {
    receiverCreateEvent: (userId: string) => {
      socket.emit(WSEventEnum.RECEIVER_CREATE, userId);
    },
  };
};
