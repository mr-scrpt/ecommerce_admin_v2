"use client";

import { storeApi } from "../_api/store.api";
import { useStoreListBySettlementRefWithRelation } from "../_query/storeListBySettlementRefWithRelation";
import { useListenStoreListUpdate } from "./event/useListenStoreListUpdate";

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
  useListenStoreListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeListToSelect: sotoreListToSelect,
  };
};

export const useInvalidateStoreList = () => {
  const invalidate =
    storeApi.useUtils().store.getListBySettlementRefWithRelation.invalidate;

  return (settlementRef: string) => invalidate({ settlementRef });
};
