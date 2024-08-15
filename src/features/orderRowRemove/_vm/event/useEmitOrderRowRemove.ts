import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderRowRemove = () => {
  const socket = useSocket();

  return {
    orderRowRemoveEvent: (orderId: string) => {
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
