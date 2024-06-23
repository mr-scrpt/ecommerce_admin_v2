"use client";
import { deliveryApi } from "../_api/delivery.api";
import { Delivery } from "../_domain/delivery.types";
import { useListenDeliveryUpdateByOrderId } from "../_vm/event/useListenDeliveryUpdateByOrderId";

export const useDeliveryByOrderIdQuery = (orderId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getByOrder.useQuery<Delivery>({ orderId });

  useListenDeliveryUpdateByOrderId();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data,
  };
};

export const useInvalidateDeliveryByOrderId = () => {
  const invalidateDelivery = deliveryApi.useUtils().delivery.invalidate;

  return (orderId: string) => {
    console.log("output_log: in invalidate function 888884444 =>>>", orderId);
    invalidateDelivery();
  };
};
