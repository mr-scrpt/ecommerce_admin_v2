import { useSocket } from "@/shared/lib/socket";
import { UserId } from "@/shared/lib/user";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitUserUpdate = () => {
  const socket = useSocket();

  return {
    userUpdateEvent: (userId: UserId) => {
      socket.emit(WSEventEnum.USER_UPDATE, userId);
    },
  };
};
