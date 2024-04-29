import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitStoreUpdate = () => {
  const socket = useSocket();

  return {
    storeUpdateEvent: (storeId: string) => {
      socket.emit(WSEventEnum.STORE_UPDATE, storeId);
    },
  };
};
