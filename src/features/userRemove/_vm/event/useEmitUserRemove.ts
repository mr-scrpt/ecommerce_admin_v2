import { useSocket } from "@/shared/lib/socket";
import { UserId } from "@/shared/lib/user";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitUserRemove = () => {
  const socket = useSocket();

  return {
    userRemoveEvent: (userId: UserId) => {
      socket.emit(WSEventEnum.USER_REMOVE, userId);
    },
  };
};
