"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useConsumerRelationByOrder } from "../../_query/consumerRelationByOrder.query";

export const useListenConsumerUpdate = () => {
  const invalidateConsumer = useConsumerRelationByOrder();

  useSocketHandler(WSEventEnum.ORDER_REFRESH, (orderId: string) => {
    console.log("output_log: order owner invalidate!!! =>>>", orderId);
    invalidateConsumer(orderId);
  });
};
