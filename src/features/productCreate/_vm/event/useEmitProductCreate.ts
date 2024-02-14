import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitProductCreate = () => {
  const socket = useSocket();

  return {
    productCreateEvent: () => {
      socket.emit(WSEventEnum.PRODUCT_CREATE);
    },
  };
};
