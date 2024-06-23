"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { Delivery } from "../../_domain/delivery.types";
import { useInvalidateDelivery } from "../../_query/delivery.query";

// TODO: Figure out how to use invalidate here
export const useListenDeliveryUpdate = () => {
  const invalidateDelivery = useInvalidateDelivery();

  useSocketHandler(WSEventEnum.DELIVERY_REFRESH, (delivery: Delivery) => {
    const { id } = delivery;
    invalidateDelivery(id);
  });
};
