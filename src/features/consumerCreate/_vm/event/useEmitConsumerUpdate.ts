import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitConsumerUpdate = () => {
  const socket = useSocket();

  // TODO: User or Consumer update?
  return {
    consumerUpdateEvent: (consumerId: string) => {
      socket.emit(WSEventEnum.USER_UPDATE, consumerId);
    },
  };
};
