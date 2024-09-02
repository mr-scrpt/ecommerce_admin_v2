"use client";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { deliveryApi } from "../_api/delivery.api";
import { useListenDeliveryUpdateByOrderId } from "../_vm/event/useListenDeliveryUpdateByOrderId";

export const useDeliveryByOrderIdQuery = (orderId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getByOrder.useQuery<Delivery>({ orderId });

  useListenDeliveryUpdateByOrderId();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data ?? null,
  };
};

export const useInvalidateDeliveryByOrderId = () => {
  const invalidateDelivery = deliveryApi.useUtils().delivery.invalidate;

  return (orderId: string) => {
    invalidateDelivery();
  };
};
