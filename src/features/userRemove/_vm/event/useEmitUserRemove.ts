import { UserId } from "@/entities/user/user";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitUserRemove = () => {
  const socket = useSocket();

  return {
    userRemoveEvent: (userId: UserId) => {
      socket.emit(WSEventEnum.USER_REMOVE, userId);
    },
  };
};
