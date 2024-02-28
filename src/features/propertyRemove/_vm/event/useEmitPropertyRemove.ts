import { PropertyId } from "@/entities/property";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitPropertyRemove = () => {
  const socket = useSocket();

  return {
    propertyRemoveEvent: (propertyId: PropertyId) => {
      socket.emit(WSEventEnum.PROPERTY_REMOVE, propertyId);
    },
  };
};
