import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderRowCreate = () => {
  const socket = useSocket();

  return {
    orderRowCreateEvent: (orderId: string) => {
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
