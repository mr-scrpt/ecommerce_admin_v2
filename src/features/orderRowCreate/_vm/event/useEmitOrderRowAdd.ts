import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOrderRowAdd = () => {
  const socket = useSocket();

  return {
    orderRowAddEvent: (orderId: string) => {
      socket.emit(WSEventEnum.ORDER_UPDATE, orderId);
    },
  };
};
