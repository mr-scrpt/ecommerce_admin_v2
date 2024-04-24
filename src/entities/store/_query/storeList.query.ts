"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreListAction } from "../_action/getStoreList.action";
import { baseQueryKey } from "../_domain/types";
import { useListenStoreListUpdate } from "../_vm/event/useListenStoreListUpdate";

export const getStoreListQuery = () =>
  queryOptions({
    queryKey: [baseQueryKey, "getStoreList"],
    queryFn: () => getStoreListAction(),
  });

export const useStoreListQuery = () => {
  const query = getStoreListQuery();
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenStoreListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: data ? data.storeList : [],
  };
};

export const useInvalidateStoreList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getStoreList"],
    });
};
