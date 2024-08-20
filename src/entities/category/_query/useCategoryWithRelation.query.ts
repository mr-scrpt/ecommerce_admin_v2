"use client";
import { categoryApi } from "../_api/category.api";
import { CategoryRelation } from "../_domain/category.types";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

export const useCategoryWithRelationQuery = (id: string) => {
  const { data, isPending, isSuccess, isFetchedAfterMount, error } =
    categoryApi.category.getRelation.useQuery<CategoryRelation>({ id });

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    category: data ?? null,
  };
};

export const useInvalidateCategoryWithRelation = () => {
  const invalidateCategory =
    categoryApi.useUtils().category.getRelation.invalidate;
  return (id: string) => invalidateCategory({ id });
};
