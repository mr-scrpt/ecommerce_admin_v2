"use client";

import { Store } from "@/kernel/domain/store/store.type";
import { storeApi } from "../_api/store.api";
import { useListenStoreListUpdate } from "../_vm/event/useListenStoreListUpdate";

export const useStoreListBySettlementRefQuery = (settlementRef?: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    storeApi.store.getListBySettlementRef.useQuery<Array<Store>>({
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

export const useInvaliteStoreListBySettlementRef = () => {
  const invalidate =
    storeApi.useUtils().store.getListBySettlementRef.invalidate;

  return (settlementRef: string) => invalidate({ settlementRef });
};
