import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderCreate = () => {
  const socket = useSocket();

  return {
    orderCreateEvent: (orderId: string) => {
      socket.emit(WSEventEnum.ORDER_CREATE, orderId);
    },
  };
};
