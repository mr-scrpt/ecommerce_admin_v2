"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { OrderId } from "../../_domain/types";
import { useInvalidateOrderWithRelation } from "../../_query/orderWithRelation.query";

export const useListenOrderUpdate = () => {
  const invalidateOrder = useInvalidateOrderWithRelation();

  useSocketHandler(WSEventEnum.PRODUCT_REFRESH, (orderId: OrderId) => {
    console.log("output_log: order invalidate =>>>", orderId);
    invalidateOrder(orderId);
  });
};
