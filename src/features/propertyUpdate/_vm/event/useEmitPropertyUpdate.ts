import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitPropertyUpdate = () => {
  const socket = useSocket();

  return {
    propertyUpdateEvent: (propertyId: string) => {
      socket.emit(WSEventEnum.PROPERTY_UPDATE, propertyId);
    },
  };
};
