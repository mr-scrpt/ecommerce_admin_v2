"use client";
import { getOrderOwnerDataAction } from "@/features/orderOwnerData/_action/getOrderOwnerData.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseQueryKey } from "../_domain/types";
import { useListenOrderOwnerUpdate } from "../_vm/event/useListenOrderOwnerUpdate";

export const getOrderOwnerQuery = (orderId: string) => ({
  queryKey: [baseQueryKey, "getOrderOwner", orderId],

  queryFn: () => getOrderOwnerDataAction({ orderId }),
});

export const useOrderOwnerQuery = (orderId: string) => {
  const query = getOrderOwnerQuery(orderId);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenOrderOwnerUpdate();

  return {
    isPending,
    isSuccess,
    data: data?.data,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderOwner = () => {
  const queryClient = useQueryClient();

  return (orderId: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getOrderOwner", orderId],
    });
};
