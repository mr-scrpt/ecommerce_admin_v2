import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderUpdateStatus = () => {
  const socket = useSocket();

  return {
    orderUpdateStausEvent: (orderId: string) => {
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
