import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderRowUpdate = () => {
  const socket = useSocket();

  return {
    orderRowUpdateEvent: (orderId: string) => {
      console.log("output_log: update row =>>>", orderId);
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
