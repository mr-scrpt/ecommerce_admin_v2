import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitStaffUpdate = () => {
  const socket = useSocket();

  return {
    userUpdateEvent: (userId: string) => {
      socket.emit(WSEventEnum.USER_UPDATE, userId);
    },
  };
};
