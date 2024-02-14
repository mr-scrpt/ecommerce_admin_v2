"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryListAction } from "../_action/getCategoryList.action";
import { CategoryId, baseQueryKey } from "../_domain/types";
import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";

export const getCategoryListQuery = (categoryId: CategoryId) => ({
  queryKey: [baseQueryKey, "getCategoryList"],
  queryFn: () => getCategoryListAction({ categoryId }),
});

export const useCategoryListQuery = (categoryId: CategoryId) => {
  const query = getCategoryListQuery(categoryId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenCategoryListUpdate();

  return {
    isPending,
    isSuccess,
    data: data ? data.categoryList : [],
  };
};

export const useInvalidateCategoryList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getCategoryList"],
    });
};
