import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderDeliveryUpdate = () => {
  const socket = useSocket();

  return {
    deliveryUpdateEvent: (deliveryId: string) => {
      socket.emit(WSEventEnum.DELIVERY_UPDATE, deliveryId);
    },
  };
};
