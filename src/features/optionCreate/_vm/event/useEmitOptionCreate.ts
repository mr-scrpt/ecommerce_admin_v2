import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitOptionCreate = () => {
  const socket = useSocket();

  return {
    optionCreateEvent: () => {
      socket.emit(WSEventEnum.OPTION_CREATE);
    },
  };
};
