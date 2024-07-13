"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateReceiverRelation } from "../../_query/useReceiverRelation.query";

export const useListenReceiverRelation = () => {
  const invalidateReceiverByUser = useInvalidateReceiverRelation();

  useSocketHandler(WSEventEnum.RECEIVER_REFRESH, (userId: string) => {
    console.log("output_log: refresh receiver relation=>>>", userId);
    invalidateReceiverByUser(userId);
  });
};
