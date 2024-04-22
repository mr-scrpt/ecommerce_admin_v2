"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseQueryKey } from "../_domain/delivery.types";
import { useListenDeliveryUpdate } from "../_vm/event/useListenDeliveryUpdate";
import { getPostOfficeListToSelectAction } from "../_action/getPostOfficeListToSelect.action";

const QUERY_KEY = "getPostOfficeListToSelect";
export const getPostOfficeListToSelectQuery = (settlement: string) =>
  queryOptions({
    queryKey: [baseQueryKey, QUERY_KEY, settlement],
    queryFn: () => getPostOfficeListToSelectAction({ settlement }),
  });

export const usePostOfficeListToSelectQuery = (settlement: string) => {
  const query = getPostOfficeListToSelectQuery(settlement);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenDeliveryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    postOfficeListToSelect: data?.postOfficeListToSelect || [],
  };
};

export const useInvalidatePostOfficeListToSelect = () => {
  const queryClient = useQueryClient();

  return (settlement: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, QUERY_KEY, settlement],
    });
};
