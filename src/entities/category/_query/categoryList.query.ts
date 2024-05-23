"use client";
import { categoryApi } from "..";
import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";

export const useCategoryListQuery = () => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    categoryApi.getList.useQuery();

  useListenCategoryListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    categoryList: data ?? [],
  };
};

export const useInvalidateCategoryList = () => {
  const invalidateCategory = categoryApi.useUtils().getList.invalidate;
  return () => invalidateCategory();
};
