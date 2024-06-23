"use client";
import { categoryApi } from "../_api/category.api";
import { Category } from "../_domain/category.types";
import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";

export const useCategoryListQuery = () => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    categoryApi.category.getList.useQuery<Array<Category>>();

  useListenCategoryListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    categoryList: data ?? [],
  };
};

export const useInvalidateCategoryList = () => {
  const invalidateCategory = categoryApi.useUtils().category.getList.invalidate;
  return () => invalidateCategory();
};
