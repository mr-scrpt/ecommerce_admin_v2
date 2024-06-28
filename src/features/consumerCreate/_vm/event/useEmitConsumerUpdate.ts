import { useSocket } from "@/shared/lib/socket";
import { ConsumerId } from "@/shared/lib/consumer";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitConsumerUpdate = () => {
  const socket = useSocket();

  return {
    consumerUpdateEvent: (consumerId: ConsumerId) => {
      socket.emit(WSEventEnum.consumer_UPDATE, consumerId);
    },
  };
};
