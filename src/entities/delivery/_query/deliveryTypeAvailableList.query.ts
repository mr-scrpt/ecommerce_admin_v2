"use client";
import { DeliveryType } from "@/kernel/domain/delivery/deliveryType.type";
import { deliveryApi } from "../_api/delivery.api";
import { useListenDeliveryListUpdate } from "../_vm/event/useListenDeliveryListUpdate";

export const useDeliveryTypeAvailableListQuery = (settlementRef?: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data, error } =
    deliveryApi.delivery.getTypeAvailableList.useQuery<Array<DeliveryType>>({
      settlementRef,
    });

  useListenDeliveryListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    deliveryTypeAvailablList: data ? data : [],
  };
};

export const useInvalidateDeliveryList = () => {
  const invalidateDelivery = deliveryApi.useUtils().delivery.getList.invalidate;
  return () => invalidateDelivery();
};
