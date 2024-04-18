"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderListAction } from "../_action/getOrderList.action";
import { baseQueryKey } from "../_domain/order.types";
import { useListenOrderListUpdate } from "../_vm/event/useListenOrderListUpdate";

export const getOrderListQuery = () =>
  queryOptions({
    queryKey: [baseQueryKey, "getOrderList"],
    queryFn: () => getOrderListAction(),
  });

export const useOrderListQuery = () => {
  const query = getOrderListQuery();
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenOrderListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: data ? data.orderList : [],
  };
};

export const useInvalidateOrderList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getOrderList"],
    });
};
