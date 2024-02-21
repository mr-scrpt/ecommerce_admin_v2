"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryWithRelationAction } from "../_action/getCategoryWithRelation.action";
import { CategoryId, baseQueryKey } from "../_domain/types";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

export const getCategoryWithRelationQuery = (categoryId: CategoryId) => ({
  queryKey: [baseQueryKey, "getCategoryWithRelation", categoryId],
  queryFn: () => getCategoryWithRelationAction({ categoryId }),
});

export const useCategoryWithRelationQuery = (categoryId: CategoryId) => {
  const query = getCategoryWithRelationQuery(categoryId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    category: data?.category,
  };
};

export const useInvalidateCategoryWithRelation = () => {
  const queryClient = useQueryClient();

  return (categoryId: CategoryId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getCategoryWithRelation", categoryId],
    });
};
