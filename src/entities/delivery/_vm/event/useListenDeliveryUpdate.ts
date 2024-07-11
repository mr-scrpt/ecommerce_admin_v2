"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateDelivery } from "../../_query/delivery.query";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";

// TODO: Figure out how to use invalidate here
export const useListenDeliveryUpdate = () => {
  const invalidateDelivery = useInvalidateDelivery();

  useSocketHandler(WSEventEnum.DELIVERY_REFRESH, (delivery: Delivery) => {
    const { id } = delivery;
    invalidateDelivery(id);
  });
};
