"use client";

import { storeApi } from "../_api/store.api";
import { StoreRelation } from "../_domain/types";
import { useListenStoreListUpdate } from "../_vm/event/useListenStoreListUpdate";

export const useStoreListBySettlementRefWithRelation = (
  settlementRef: string,
) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    storeApi.store.getListBySettlementRefWithRelation.useQuery<
      Array<StoreRelation>
    >({
      settlementRef,
    });

  useListenStoreListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: data ?? [],
  };
};

export const useInvaliteStoreListBySettlementRefWithRelation = () => {
  const invalidate =
    storeApi.useUtils().store.getListBySettlementRefWithRelation.invalidate;

  return (settlementRef: string) => invalidate({ settlementRef });
};
