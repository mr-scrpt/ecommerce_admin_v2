"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeliveryListAction } from "../_action/getDeliveryList.action";
import { baseQueryKey } from "../_domain/delivery.types";
import { useListenDeliveryListUpdate } from "../_vm/event/useListenDeliveryListUpdate";

export const getDeliveryListQuery = () => ({
  queryKey: [baseQueryKey, "getDeliveryList"],
  queryFn: () => getDeliveryListAction(),
});

export const useDeliveryListQuery = () => {
  const query = getDeliveryListQuery();
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenDeliveryListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    deliveryList: data ? data.deliveryList : [],
  };
};

export const useInvalidateDeliveryList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getDeliveryList"],
    });
};
