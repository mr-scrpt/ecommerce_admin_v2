"use client";
import { categoryApi } from "../_api/category.api";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

type CategoryPayload = {
  categoryId?: string;
  categorySlug?: string;
};

export const useCategoryWithRelationQuery = (params: CategoryPayload) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    categoryApi.category.getWithRelation.useQuery(params);
  console.log("output_log: data  =>>>", data);

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
    categoryApi.useUtils().category.getWithRelation.invalidate;
  return (categoryId: string) => invalidateCategory({ categoryId });
};
