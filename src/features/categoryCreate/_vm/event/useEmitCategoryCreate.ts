import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitCategoryCreate = () => {
  const socket = useSocket();

  return {
    categoryCreateEvent: () => {
      socket.emit(WSEventEnum.CATEGORY_CREATE);
    },
  };
};
