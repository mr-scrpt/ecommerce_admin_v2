import { useSocket } from "@/shared/lib/socket";
import { UserId } from "@/shared/lib/user";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitProfileUpdate = () => {
  const socket = useSocket();

  return {
    profileUpdateEvent: (profileId: UserId) => {
      socket.emit(WSEventEnum.PROFILE_UPDATE, profileId);
    },
  };
};
