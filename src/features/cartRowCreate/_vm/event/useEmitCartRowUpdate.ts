import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitCartUpdate = () => {
  const socket = useSocket();

  return {
    cartUpdateEvent: (cartId: string) => {
      socket.emit(WSEventEnum.CART_REFRESH, cartId);
    },
  };
};
