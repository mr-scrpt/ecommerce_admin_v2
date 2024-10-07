import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitPropertyRemove = () => {
  const socket = useSocket();

  return {
    propertyRemoveEvent: (propertyId: string) => {
      socket.emit(WSEventEnum.PROPERTY_REMOVE, propertyId);
    },
  };
};
