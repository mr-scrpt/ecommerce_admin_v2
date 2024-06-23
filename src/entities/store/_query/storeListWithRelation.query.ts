"use client";
import { useListenStoreListUpdate } from "@/entities/store";
import { storeApi } from "../_api/store.api";

export const useStoreListWithRelationQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    storeApi.store.getListWithRelation.useQuery();

  useListenStoreListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: data ?? [],
  };
};

export const useInvalidateStoreList = () => {
  const invalidate = storeApi.useUtils().store.getListWithRelation.invalidate;

  return () => invalidate();
};
