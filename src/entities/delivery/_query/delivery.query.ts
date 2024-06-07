"use client";
import { deliveryApi } from "../_api/delivery.api";
import { Delivery } from "../_domain/delivery.types";
import { useListenDeliveryUpdate } from "../_vm/event/useListenDeliveryUpdate";

export const useDeliveryQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.get.useQuery<Delivery>({ id });

  useListenDeliveryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data,
  };
};

export const useInvalidateDelivery = () => {
  const invalidateDelivery = deliveryApi.useUtils().delivery.get.invalidate;
  return (id: string) => invalidateDelivery({ id });
};
