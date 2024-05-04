"use client";
import { useListenStoreListUpdate } from "@/entities/store";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreSettlementToSelectAction } from "../_action/getStoreSettlementToSelect.action";

const baseQueryKey = "storeData";

export const getStoreSettlementToSelectQuery = (settlement: string) =>
  queryOptions({
    queryKey: [baseQueryKey, "getStoreSettlementToSelect", settlement],
    queryFn: () => getStoreSettlementToSelectAction({ settlement }),
  });

export const useStoreSettlementToSelectQuery = (settlement: string) => {
  const query = getStoreSettlementToSelectQuery(settlement);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenStoreListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeListToSelect: data ? data.storeList : [],
  };
};

export const useInvalidateStoreList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getStoreSettlementToSelect"],
    });
};
