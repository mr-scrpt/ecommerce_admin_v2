import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitPropertyCreate = () => {
  const socket = useSocket();

  return {
    propertyCreateEvent: () => {
      socket.emit(WSEventEnum.PROPERTY_CREATE);
    },
  };
};
