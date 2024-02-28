import { PropertyId } from "@/entities/property";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitPropertyUpdate = () => {
  const socket = useSocket();

  return {
    propertyUpdateEvent: (propertyId: PropertyId) => {
      socket.emit(WSEventEnum.PROPERTY_UPDATE, propertyId);
    },
  };
};
