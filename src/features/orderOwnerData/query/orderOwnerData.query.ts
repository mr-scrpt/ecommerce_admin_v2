"use client";
import { getOwnerWithOrderListAction } from "@/features/orderOwnerData/_action/getOwnerWithOrderList.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseQueryKey } from "../_domain/types";

export const getOrderOwnerQuery = (orderId: string) => ({
  queryKey: [baseQueryKey, "getOrderOwner", orderId],

  queryFn: () => getOwnerWithOrderListAction({ orderId }),
});

export const useOrderOwnerQuery = (orderId: string) => {
  const query = getOrderOwnerQuery(orderId);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  // useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    data: data?.data,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderWithRelation = () => {
  const queryClient = useQueryClient();

  return (orderId: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getOrderOwner", orderId],
    });
};
