"use client";

import { useStoreListBySettlementRefWithRelation } from "../_query/__storeListBySettlementRefWithRelation";

export const useStoreListBySettltmentRefToSelectModel = (
  settlementRef: string,
) => {
  const { storeList, isPending, isSuccess, isFetchedAfterMount } =
    useStoreListBySettlementRefWithRelation(settlementRef);

  const sotoreListToSelect = storeList.map((store) => {
    return {
      value: store.id,
      label: store.name,
    };
  });

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeListToSelect: sotoreListToSelect,
  };
};
