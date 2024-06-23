"use client";
import { categoryApi } from "../_api/category.api";
import { CategoryRelation } from "../_domain/category.types";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

type QueryParams = {
  id?: string;
  slug?: string;
};

export const useCategoryWithRelationQuery = (query: QueryParams) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    categoryApi.category.getRelation.useQuery<CategoryRelation>(query);

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
  return (params: QueryParams) => invalidateCategory(params);
};
