import { OrderId } from "@/entities/order";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderUpdateStatus = () => {
  const socket = useSocket();

  return {
    orderUpdateStausEvent: (orderId: OrderId) => {
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
