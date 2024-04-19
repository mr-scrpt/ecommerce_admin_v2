"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseQueryKey } from "../_domain/delivery.types";
import { useListenDeliveryUpdate } from "../_vm/event/useListenDeliveryUpdate";
import { getDeliveryByOrderIdAction } from "../_action/getDeliveryByOrderId.action";

export const getDeliveryByOrderIdQuery = (orderId: string) =>
  queryOptions({
    queryKey: [baseQueryKey, "getDelivery", orderId],
    queryFn: () => getDeliveryByOrderIdAction({ orderId: orderId }),
  });

export const useDeliveryByOrderIdQuery = (orderId: string) => {
  console.log("output_log: in query =>>>");
  const query = getDeliveryByOrderIdQuery(orderId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenDeliveryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    delivery: data?.delivery,
  };
};

export const useInvalidateOrderIdDelivery = () => {
  const queryClient = useQueryClient();

  return (orderId: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getDelivery", orderId],
    });
};
