import { OptionId } from "@/entities/option";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOptionUpdate = () => {
  const socket = useSocket();

  return {
    optionUpdateEvent: (optionId: OptionId) => {
      socket.emit(WSEventEnum.OPTION_UPDATE, optionId);
    },
  };
};
