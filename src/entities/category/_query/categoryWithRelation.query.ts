"use client";
import { categoryApi } from "../_api/category.api";
import { CategoryRelation } from "../_domain/types";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

type CategoryParams = {
  categoryId?: string;
  categorySlug?: string;
};

export const useCategoryWithRelationQuery = (params: CategoryParams) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    categoryApi.category.getRelation.useQuery<CategoryRelation>(params);

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
  return (categoryId: string) => invalidateCategory({ categoryId });
};
