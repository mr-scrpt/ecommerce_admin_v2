import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { UserId, useInvalidateUser } from "../../user";

export const useListenUserUpdate = () => {
  const invalidateUser = useInvalidateUser();

  useSocketHandler(WSEventEnum.USER_REFRESH, (userId: UserId) => {
    invalidateUser(userId);
  });
  // return {
  //   userUpdateEvent: () => {
  //     socket.emit(WSEventEnum.USER_UPDATE);
  //   },
  // };
};
