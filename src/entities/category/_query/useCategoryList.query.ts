"use client";
import { Category } from "@/kernel/domain/category/category.type";
import { categoryApi } from "../_api/category.api";
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
