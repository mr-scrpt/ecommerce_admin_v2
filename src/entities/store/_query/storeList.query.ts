"use client";
import { storeApi } from "../_api/store.api";
import { useListenStoreListUpdate } from "../_vm/event/useListenStoreListUpdate";

export const useStoreListQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    storeApi.store.getList.useQuery();

  useListenStoreListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: data ?? [],
  };
};

export const useInvalidateStoreList = () => {
  const invalidate = storeApi.useUtils().store.getList.invalidate;

  return () => invalidate();
};
