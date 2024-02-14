"use client";
import { Slug } from "@/shared/type/common.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategoryAction,
  getCategoryBySlugAction,
} from "../_action/getCategory.action";
import { getCategoryListAction } from "../_action/getCategoryList.action";
import { CategoryId, baseQueryKey } from "../_domain/types";
import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

export const getCategoryQuery = (categoryId: CategoryId) => ({
  queryKey: [baseQueryKey, "getCategoryById", categoryId],
  queryFn: () => getCategoryAction({ categoryId }),
});

export const useCategoryQuery = (categoryId: CategoryId) => {
  console.log("output_log: categoryId in query =>>>", categoryId);
  const query = getCategoryQuery(categoryId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    category: data?.category,
  };
};

export const useInvalidateCategory = () => {
  const queryClient = useQueryClient();

  return (categoryId: CategoryId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getCategoryById", categoryId],
    });
};
