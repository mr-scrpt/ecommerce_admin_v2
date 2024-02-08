"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateUserList } from "../../_query/user.query";

export const useListenUserListUpdate = () => {
  const invalidateUserList = useInvalidateUserList();

  useSocketHandler(WSEventEnum.USER_LIST_REFRESH, () => {
    invalidateUserList();
  });
};
