"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeliveryAction } from "../_action/getDelivery.action";
import { baseQueryKey } from "../_domain/delivery.types";
import { useListenDeliveryUpdate } from "../_vm/event/useListenDeliveryUpdate";

export const getDeliveryQuery = (deliveryId: string) => ({
  queryKey: [baseQueryKey, "getDelivery", deliveryId],
  queryFn: () => getDeliveryAction({ deliveryId }),
});

export const useDeliveryQuery = (deliveryId: string) => {
  const query = getDeliveryQuery(deliveryId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenDeliveryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data?.delivery,
  };
};

export const useInvalidateDelivery = () => {
  const queryClient = useQueryClient();

  return (deliveryId: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getDelivery", deliveryId],
    });
};
