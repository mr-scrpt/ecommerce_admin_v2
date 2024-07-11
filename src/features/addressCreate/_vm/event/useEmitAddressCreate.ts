import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitAddressCreate = () => {
  const socket = useSocket();

  return {
    addressCreateEvent: (userId: string) => {
      socket.emit(WSEventEnum.ADDRESS_CREATE, userId);
    },
  };
};
