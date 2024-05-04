"use client";
import { useListenStoreListUpdate } from "@/entities/store";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreWithSettlementNameListBySettlementAction } from "../_action/getStoreWithSettlementNameListBySettlement.action";

const baseQueryKey = "storeData";

export const getStoreWithSettlementNameListBySettlementQuery = (
  settlement: string,
) =>
  queryOptions({
    queryKey: [
      baseQueryKey,
      "getStoreWithSettlementNameListBySettlement",
      settlement,
    ],
    queryFn: () =>
      getStoreWithSettlementNameListBySettlementAction({ settlement }),
  });

export const useStoreWithSettlementNameListBySettlementQuery = (
  settlement: string,
) => {
  const query = getStoreWithSettlementNameListBySettlementQuery(settlement);
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
      queryKey: [baseQueryKey, "getStoreWithSettlementNameListBySettlement"],
    });
};
