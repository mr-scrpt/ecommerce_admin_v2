import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitStoreRemove = () => {
  const socket = useSocket();

  return {
    storeRemoveEvent: (storeId: string) => {
      socket.emit(WSEventEnum.STORE_REMOVE, storeId);
    },
  };
};
