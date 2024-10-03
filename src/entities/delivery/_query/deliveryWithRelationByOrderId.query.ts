"use client";
import { deliveryApi } from "../_api/delivery.api";
import { DeliveryRelation } from "../_domain/delivery.types";
import { useListenDeliveryUpdateByOrderId } from "../_vm/event/useListenDeliveryUpdateByOrderId";

export const useDeliveryWithRelationByOrderIdQuery = (orderId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getWithRelationByOrder.useQuery<DeliveryRelation>({
      orderId,
    });

  useListenDeliveryUpdateByOrderId();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data ?? null,
  };
};

export const useInvalidateDeliveryWithRelationByOrderId = () => {
  const invalidateDelivery =
    deliveryApi.useUtils().delivery.getWithRelationByOrder.invalidate;

  return (orderId: string) => {
    invalidateDelivery({ orderId });
  };
};
