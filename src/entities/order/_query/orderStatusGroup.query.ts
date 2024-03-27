"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderStatusGroupAction } from "../_action/getOrderStatusGroup.action";
import { OrderId, baseQueryKey } from "../_domain/order.types";
import { useListenOrderUpdate } from "../_vm/event/useListenOrderUpdate";

export const getOrderStatusGroupQuery = (orderId: OrderId) => ({
  queryKey: [baseQueryKey, "getOrderStatusGroup", orderId],
  queryFn: () => {
    return getOrderStatusGroupAction({ orderId });
  },
});

export const useOrderStatusGroupQuery = (orderId: OrderId) => {
  const query = getOrderStatusGroupQuery(orderId);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    orderStatusGroup: data?.orderStatusGroup,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderStatusGroupRelation = () => {
  const queryClient = useQueryClient();

  return (orderId: OrderId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getOrderStatusGroup", orderId],
    });
};
