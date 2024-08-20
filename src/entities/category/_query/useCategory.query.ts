"use client";
import { Category } from "@/kernel/domain/category/category.type";
import { categoryApi } from "../_api/category.api";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

export const useCategoryQuery = (id: string) => {
  const { data, isPending, isSuccess, isFetchedAfterMount, error } =
    categoryApi.category.get.useQuery<Category>({ id });

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    category: data ?? null,
  };
};

export const useInvalidateCategory = () => {
  const invalidateCategory =
    categoryApi.useUtils().category.getRelation.invalidate;
  return (id: string) => invalidateCategory({ id });
};
