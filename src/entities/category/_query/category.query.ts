"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryAction } from "../_action/getCategory.action";
import { Category, CategoryId, baseQueryKey } from "../_domain/types";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";
import { useGetServerAction } from "@/shared/lib/serverAction";

type CategoryPayload = {
  categoryId?: string;
  categorySlug?: string;
};
export const useGetCategoryQuery = (categoryId: CategoryId) => {
  const { getCategory } = useGetServerAction<{
    getCategory: (payload: CategoryPayload) => Promise<{ category: Category }>;
  }>();

  return queryOptions({
    queryKey: [baseQueryKey, "getCategory", categoryId],
    // queryFn: () => getCategoryAction({ categoryId }),
    queryFn: () => getCategory({ categoryId }),
  });
};

export const useCategoryQuery = (categoryId: CategoryId) => {
  const query = useGetCategoryQuery(categoryId);
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
