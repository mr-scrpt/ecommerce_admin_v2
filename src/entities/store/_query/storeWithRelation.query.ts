"use client";
import { storeApi } from "../_api/store.api";
import { useListenStoreUpdate } from "../_vm/event/useListenStoreUpdate";

export const useStoreWithRelationQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    storeApi.store.getRelation.useQuery({ id });

  useListenStoreUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    store: data,
  };
};

export const useInvalidateStoreWithRelation = () => {
  const invalidation = storeApi.useUtils().store.getRelation.invalidate;
  return (id: string) => invalidation({ id });
};
