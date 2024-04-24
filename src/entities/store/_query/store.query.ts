"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreAction } from "../_action/getStore.action";
import { StoreId, baseQueryKey } from "../_domain/types";
import { useListenStoreUpdate } from "../_vm/event/useListenStoreUpdate";

export const getStoreQuery = (storeId: StoreId) =>
  queryOptions({
    queryKey: [baseQueryKey, "getStore", storeId],
    queryFn: () => getStoreAction({ storeId }),
  });

export const useStoreQuery = (storeId: StoreId) => {
  const query = getStoreQuery(storeId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenStoreUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    store: data?.store,
  };
};

export const useInvalidateStore = () => {
  const queryClient = useQueryClient();
  console.log("output_log: invalidateQueries Store =>>>");

  return (storeId: StoreId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getStore", storeId],
    });
};
