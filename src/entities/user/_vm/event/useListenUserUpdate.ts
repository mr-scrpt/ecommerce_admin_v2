"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateUser } from "../../_query/user.query";

export const useListenUserUpdate = () => {
  const invalidateUser = useInvalidateUser();

  useSocketHandler(WSEventEnum.USER_REFRESH, (userId: string) => {
    invalidateUser(userId);
  });
};
