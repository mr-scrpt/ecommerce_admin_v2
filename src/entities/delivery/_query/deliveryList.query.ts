"use client";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { deliveryApi } from "../_api/delivery.api";
import { useListenDeliveryListUpdate } from "../_vm/event/useListenDeliveryListUpdate";

export const useDeliveryListQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getList.useQuery<Array<Delivery>>();

  useListenDeliveryListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    deliveryList: data ? data : [],
  };
};

export const useInvalidateDeliveryList = () => {
  const invalidateDelivery = deliveryApi.useUtils().delivery.getList.invalidate;
  return () => invalidateDelivery();
};
