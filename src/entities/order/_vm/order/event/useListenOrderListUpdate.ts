"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateOrderList } from "../../../_query/order/useOrderList.query";

export const useListenOrderListUpdate = () => {
  const invalidateOrderList = useInvalidateOrderList();

  useSocketHandler(WSEventEnum.ORDER_LIST_REFRESH, () => {
    console.log("output_log: order list invalidate =>>>");
    invalidateOrderList();
  });
};
