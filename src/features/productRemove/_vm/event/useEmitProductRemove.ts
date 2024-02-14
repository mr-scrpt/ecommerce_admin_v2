import { ProductId } from "@/entities/product";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitProductRemove = () => {
  const socket = useSocket();

  return {
    productRemoveEvent: (productId: ProductId) => {
      socket.emit(WSEventEnum.PRODUCT_REMOVE, productId);
    },
  };
};
