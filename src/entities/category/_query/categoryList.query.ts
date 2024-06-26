"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryListAction } from "../_action/getCategoryList.action";
import { baseQueryKey } from "../_domain/types";
import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";

export const getCategoryListQuery = () =>
  queryOptions({
    queryKey: [baseQueryKey, "getCategoryList"],
    queryFn: () => getCategoryListAction(),
  });

export const useCategoryListQuery = () => {
  const query = getCategoryListQuery();
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenCategoryListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    categoryList: data ? data.categoryList : [],
  };
};

export const useInvalidateCategoryList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getCategoryList"],
    });
};
