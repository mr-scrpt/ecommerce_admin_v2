import { ProductId } from "@/entities/product";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitProductUpdate = () => {
  const socket = useSocket();

  return {
    productUpdateEvent: (productId: ProductId) => {
      socket.emit(WSEventEnum.PRODUCT_UPDATE, productId);
    },
  };
};
