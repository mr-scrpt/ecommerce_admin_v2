import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitProductUpdate = () => {
  const socket = useSocket();

  return {
    productUpdateEvent: (productId: string) => {
      socket.emit(WSEventEnum.PRODUCT_UPDATE, productId);
    },
  };
};
