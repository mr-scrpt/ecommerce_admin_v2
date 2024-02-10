"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateUser } from "../../user";
import { UserId } from "@/shared/lib/user";

export const useListenUserUpdate = () => {
  const invalidateUser = useInvalidateUser();

  useSocketHandler(WSEventEnum.USER_REFRESH, (userId: UserId) => {
    invalidateUser(userId);
  });
};
