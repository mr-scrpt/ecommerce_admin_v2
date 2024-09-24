import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderReceiverUpdate = () => {
  const socket = useSocket();

  return {
    orderReceiverUpdateEvent: (orderId: string) => {
      console.log("output_log: update receiver =>>>", orderId);
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
