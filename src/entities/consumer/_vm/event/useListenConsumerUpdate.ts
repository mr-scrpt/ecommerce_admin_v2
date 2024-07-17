"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateConsumerRelationByOrder } from "../../_query/consumerRelationByOrder.query";

export const useListenConsumerUpdate = () => {
  const invalidateConsumer = useInvalidateConsumerRelationByOrder();

  useSocketHandler(WSEventEnum.USER_REFRESH, (userId: string) => {
    console.log("output_log: order owner invalidate!!! =>>>", userId);
    invalidateConsumer(userId);
  });
};
