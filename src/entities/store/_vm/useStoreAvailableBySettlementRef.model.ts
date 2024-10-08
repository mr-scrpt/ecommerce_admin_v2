"use client";

import { useStoreListBySettlementRefWithRelation } from "../_query/storeListBySettlementRefWithRelation";

export const useStoreAvailableBySettlementRefModel = (
  settlementRef: string,
) => {
  const { storeList, isPending, isSuccess, isFetchedAfterMount } =
    useStoreListBySettlementRefWithRelation(settlementRef);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    isStoreAvailable: !!storeList.length,
  };
};
