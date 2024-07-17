import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitUserRemove = () => {
  const socket = useSocket();

  return {
    userRemoveEvent: (userId: string) => {
      socket.emit(WSEventEnum.USER_REMOVE, userId);
    },
  };
};
