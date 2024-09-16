"use client";
import { deliveryApi } from "../_api/delivery.api";
import { DeliveryRelation } from "../_domain/delivery.types";
import { useListenDeliveryUpdateByOrderId } from "../_vm/event/useListenDeliveryUpdateByOrderId";

export const useDeliveryWithRelationQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getWithRelation.useQuery<DeliveryRelation>({
      id,
    });

  useListenDeliveryUpdateByOrderId();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data ?? null,
  };
};

export const useInvalidateDeliveryWithRelation = () => {
  const invalidateDelivery =
    deliveryApi.useUtils().delivery.getWithRelation.invalidate;

  return (orderId: string) => {
    invalidateDelivery({ id: orderId });
  };
};
