"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreWithSettlementNameListAction } from "../_action/getStoreWithSettlementNameList.action";
import { useListenStoreListUpdate } from "@/entities/store";

const baseQueryKey = "storeData";

export const getStoreWithSettlementNameListQuery = () =>
  queryOptions({
    queryKey: [baseQueryKey, "getStoreWithSettlementNameList"],
    queryFn: () => getStoreWithSettlementNameListAction(),
  });

export const useStoreWithSettlementNameListQuery = () => {
  const query = getStoreWithSettlementNameListQuery();
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
      queryKey: [baseQueryKey, "getStoreWithSettlementNameList"],
    });
};
