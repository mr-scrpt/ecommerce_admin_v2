"use client";

import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateOrderWithRelation } from "../../_query/orderWithRelation.query";

export const useListenOrderUpdate = () => {
  const invalidateOrder = useInvalidateOrderWithRelation();

  useSocketHandler(WSEventEnum.ORDER_REFRESH, (orderId: string) => {
    console.log("output_log: order invalidate here =>>>", orderId);
    invalidateOrder(orderId);
  });
};
