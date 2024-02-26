"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryAction } from "../_action/getCategory.action";
import { CategoryId, baseQueryKey } from "../_domain/types";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

export const getCategoryQuery = (categoryId: CategoryId) => ({
  queryKey: [baseQueryKey, "getCategory", categoryId],
  queryFn: () => getCategoryAction({ categoryId }),
});

export const useCategoryQuery = (categoryId: CategoryId) => {
  const query = getCategoryQuery(categoryId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    category: data?.category,
  };
};

export const useInvalidateCategory = () => {
  const queryClient = useQueryClient();
  console.log("output_log: invalidateQueries Category =>>>");

  return (categoryId: CategoryId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getCategory", categoryId],
    });
};
