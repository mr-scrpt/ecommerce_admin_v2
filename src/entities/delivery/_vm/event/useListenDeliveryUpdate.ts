"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateDelivery } from "../../_query/delivery.query";

export const useListenDeliveryUpdate = () => {
  const invalidateDelivery = useInvalidateDelivery();

  useSocketHandler(WSEventEnum.DELIVERY_REFRESH, (deliveryId: string) => {
    console.log("output_log: delivery invalidate here =>>>", deliveryId);
    invalidateDelivery(deliveryId);
  });
};
