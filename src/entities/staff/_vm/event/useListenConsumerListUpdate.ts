"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateConsumerList } from "../../_query/consumerList.query";

export const useListenConsumerListUpdate = () => {
  const invalidateUserList = useInvalidateConsumerList();

  useSocketHandler(WSEventEnum.USER_LIST_REFRESH, () => {
    invalidateUserList();
  });
};
