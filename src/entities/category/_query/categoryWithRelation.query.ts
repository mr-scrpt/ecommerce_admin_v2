"use client";
import { categoryApi } from "../_api/category.api";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

type CategoryPayload = {
  categoryId?: string;
  categorySlug?: string;
};

export const useCategoryWithRelationQuery = (params: CategoryPayload) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    categoryApi.getWithRelation.useQuery(params);

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    category: data ?? null,
  };
};

export const useInvalidateCategoryWithRelation = () => {
  const invalidateCategory = categoryApi.useUtils().getWithRelation.invalidate;
  return (categoryId: string) => invalidateCategory({ categoryId });
};
