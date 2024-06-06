"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateDeliveryList } from "../../_query/deliveryList.query";

export const useListenDeliveryListUpdate = () => {
  const invalidateDeliveryList = useInvalidateDeliveryList();

  useSocketHandler(WSEventEnum.DELIVERY_LIST_REFRESH, () => {
    console.log("output_log: delivery list invalidate =>>>");
    invalidateDeliveryList();
  });
};
