"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderWithRelationAction } from "../_action/getOrderWithRelation.action";
import { OrderId, baseQueryKey } from "../_domain/order.types";
import { useListenOrderUpdate } from "../_vm/event/useListenOrderUpdate";

export const getOrderWithRelationQuery = (orderId: OrderId) => ({
  queryKey: [baseQueryKey, "getOrder", orderId],
  queryFn: () => {
    return getOrderWithRelationAction({ orderId });
  },
});

export const useOrderWithRelationQuery = (orderId: OrderId) => {
  const query = getOrderWithRelationQuery(orderId);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    order: data?.order,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderWithRelation = () => {
  const queryClient = useQueryClient();

  return (orderId: OrderId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getOrder", orderId],
    });
};
