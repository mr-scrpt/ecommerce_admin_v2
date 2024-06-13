"use client";
import { deliveryApi } from "../_api/delivery.api";
import { Delivery } from "../_domain/delivery.types";
import { useListenDeliveryUpdate } from "../_vm/event/useListenDeliveryUpdate";

type QueryParams = {
  orderId: string;
};
export const useDeliveryByOrderIdQuery = (query: QueryParams) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getByOrder.useQuery<Delivery>(query);

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
  return (query: QueryParams) => invalidateDelivery(query);
};
