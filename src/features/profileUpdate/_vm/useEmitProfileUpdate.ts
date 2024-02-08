import { UserId } from "@/entities/user/user";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitProfileUpdate = () => {
  const socket = useSocket();

  return {
    profileUpdateEvent: (profileId: UserId) => {
      socket.emit(WSEventEnum.PROFILE_UPDATE, profileId);
    },
  };
};
