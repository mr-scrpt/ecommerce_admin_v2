"use client";
import { Slug } from "@/shared/type/common.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategoryAction,
  getCategoryBySlugAction,
} from "../_action/getCategory.action";
import { getCategoryListAction } from "../_action/getCategoryList.action";
import { CategoryId } from "../_domain/types";
import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";

const baseKey = "category";

export const getCategoryQuery = (categoryId: CategoryId) => ({
  queryKey: [baseKey, "getCategoryById", categoryId],
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

export const getCategoryBySlugQuery = (categorySlug: Slug) => {
  console.log("output_log: useInvalidateBySlug query =>>>");
  return {
    queryKey: [baseKey, "getCategoryBySlug", categorySlug],
    queryFn: () => getCategoryBySlugAction({ categorySlug }),
  };
};

export const useCategoryBySlugQuery = (categorySlug: Slug) => {
  const query = getCategoryBySlugQuery(categorySlug);
  const { isPending, isSuccess, data } = useQuery(query);

  // useListenCategoryUpdateBySlug();

  return {
    isPending,
    isSuccess,
    category: data?.category,
  };
};

export const getCategoryListQuery = (categoryId: CategoryId) => ({
  queryKey: [baseKey, "getCategoryList"],
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

export const useInvalidateCategory = () => {
  const queryClient = useQueryClient();

  return (categoryId: CategoryId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getCategoryById", categoryId],
    });
};

// export const useInvalidateCategoryBySlug = () => {
//   const queryClient = useQueryClient();
//   console.log("output_log: useInvalidateBySlug hook =>>>");
//
//   return (categorySlug: CategorySlug) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseKey, "getCategoryBySlug", categorySlug],
//     });
// };

export const useInvalidateCategoryList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getCategoryList"],
    });
};
