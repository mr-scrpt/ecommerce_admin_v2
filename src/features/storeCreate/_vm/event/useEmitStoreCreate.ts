import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitStoreCreate = () => {
  const socket = useSocket();

  return {
    storeCreateEvent: () => {
      socket.emit(WSEventEnum.STORE_CREATE);
    },
  };
};
