import { OrderId } from "@/entities/order";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderRowUpdate = () => {
  const socket = useSocket();

  return {
    orderRowUpdateEvent: (orderId: OrderId) => {
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
