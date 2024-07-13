"use client";
import { useInvalidateReceiverListByUser } from "../../_query/useReceiverListByUser.query";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useListenReceiverListByUserUpdate = () => {
  const invalidateReceiverByUser = useInvalidateReceiverListByUser();

  useSocketHandler(WSEventEnum.RECEIVER_REFRESH, (userId: string) => {
    console.log("output_log: refresh receiver =>>>", userId);
    invalidateReceiverByUser(userId);
  });
};
