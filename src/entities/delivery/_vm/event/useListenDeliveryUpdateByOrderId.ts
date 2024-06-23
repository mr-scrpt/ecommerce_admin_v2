"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { Delivery } from "../../_domain/delivery.types";
import { useInvalidateDeliveryByOrderId } from "../../_query/deliveryByOrderId.query";

// TODO: Figure out how to use invalidate here
export const useListenDeliveryUpdateByOrderId = () => {
  const invalidateDeliveryByOrderId = useInvalidateDeliveryByOrderId();

  useSocketHandler(WSEventEnum.DELIVERY_REFRESH, (delivery: Delivery) => {
    const { orderId } = delivery;
    invalidateDeliveryByOrderId(orderId);
  });
};
