import { OptionId } from "@/entities/option";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOptionRemove = () => {
  const socket = useSocket();

  return {
    optionRemoveEvent: (optionId: OptionId) => {
      socket.emit(WSEventEnum.OPTION_REMOVE, optionId);
    },
  };
};
