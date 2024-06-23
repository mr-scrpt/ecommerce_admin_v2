"use client";
import { storeApi } from "../_api/store.api";
import { useListenStoreUpdate } from "../_vm/event/useListenStoreUpdate";

export const useStoreQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    storeApi.store.get.useQuery({ id });

  useListenStoreUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    store: data,
  };
};

export const useInvalidateStore = () => {
  const invalidation = storeApi.useUtils().store.get.invalidate;
  return (id: string) => invalidation({ id });
};
