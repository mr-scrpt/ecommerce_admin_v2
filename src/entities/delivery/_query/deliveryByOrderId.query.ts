"use client";
import { deliveryApi } from "../_api/delivery.api";
import { Delivery } from "../_domain/delivery.types";
import { useListenDeliveryUpdate } from "../_vm/event/useListenDeliveryUpdate";

export const useDeliveryByOrderIdQuery = (orderId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getByOrder.useQuery<Delivery>({ orderId });

  useListenDeliveryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data,
  };
};

export const useInvalidateOrderIdDelivery = () => {
  const invalidateDelivery =
    deliveryApi.useUtils().delivery.getByOrder.invalidate;
  return (orderId: string) => invalidateDelivery({ orderId });
};
