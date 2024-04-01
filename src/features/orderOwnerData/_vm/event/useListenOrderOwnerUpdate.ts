"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateOrderOwner } from "../../_query/orderOwnerData.query";

export const useListenOrderOwnerUpdate = () => {
  const invalidateOrderOwner = useInvalidateOrderOwner();

  useSocketHandler(WSEventEnum.ORDER_REFRESH, (orderId: string) => {
    console.log("output_log: order owner invalidate!!! =>>>", orderId);
    invalidateOrderOwner(orderId);
  });
};
