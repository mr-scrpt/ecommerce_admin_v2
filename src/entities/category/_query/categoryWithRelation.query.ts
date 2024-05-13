"use client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCategoryWithRelationAction } from "../_action/getCategoryWithRelation.action";
import {
  Category,
  CategoryId,
  CategoryRelation,
  baseQueryKey,
} from "../_domain/types";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";
import { useGetServerAction } from "@/shared/lib/serverAction";

type CategoryPayload = {
  categoryId?: string;
  categorySlug?: string;
};

export const useGetCategoryWithRelationQuery = (categoryId: CategoryId) => {
  const { getCategory } = useGetServerAction<{
    getCategory: (
      payload: CategoryPayload,
    ) => Promise<{ category: CategoryRelation }>;
  }>();
  return queryOptions({
    queryKey: [baseQueryKey, "getCategory", categoryId],
    // queryFn: () => getCategoryWithRelationAction({ categoryId }),
    queryFn: () => getCategory({ categorySlug: "fourth-category" }),
  });
};

export const useCategoryWithRelationQuery = (categoryId: CategoryId) => {
  const query = useGetCategoryWithRelationQuery(categoryId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    category: data?.category,
  };
};

// export const useInvalidateCategoryWithRelation = () => {
//   const queryClient = useQueryClient();
//
//   return (categoryId: CategoryId) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getCategory", categoryId],
//     });
// };
