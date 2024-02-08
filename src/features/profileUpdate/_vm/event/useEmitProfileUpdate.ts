import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitProfileUpdate = () => {
  const socket = useSocket();

  return {
    profileUpdateEvent: () => {
      socket.emit(WSEventEnum.PROFILE_UPDATE);
    },
  };
};
