import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitDeliveryUpdate = () => {
  const socket = useSocket();

  return {
    deliveryUpdateEvent: (delivery: Delivery) => {
      socket.emit(WSEventEnum.DELIVERY_UPDATE, delivery);
    },
  };
};
