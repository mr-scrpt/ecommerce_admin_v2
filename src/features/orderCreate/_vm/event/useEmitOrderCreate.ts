import { OrderId } from "@/entities/order";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderCreate = () => {
  const socket = useSocket();

  return {
    orderCreateStausEvent: (orderId: OrderId) => {
      socket.emit(WSEventEnum.ORDER_CREATE, orderId);
    },
  };
};
