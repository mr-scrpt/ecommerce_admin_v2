"use client";

import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateOrderWithRelation } from "../../../_query/order/useOrderWithRelation.query";
import { useInvalidateOrderRowListByOrder } from "../../../_query/orderRow/useOrderRowListByOrder.query";

export const useListenOrderUpdate = () => {
  const invalidateOrder = useInvalidateOrderWithRelation();
  const invalidateOrderRowList = useInvalidateOrderRowListByOrder();

  useSocketHandler(WSEventEnum.ORDER_REFRESH, (orderId: string) => {
    invalidateOrder(orderId);
    invalidateOrderRowList(orderId);
  });
};
