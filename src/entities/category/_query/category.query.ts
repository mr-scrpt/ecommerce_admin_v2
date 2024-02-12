import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryListAction } from "../_action/getCategoryList.action";
import { getCategoryAction } from "../_action/getCategory.action";
import { useListenCategoryListUpdate } from "../_vm/event/useListenCategoryListUpdate";
import { useListenCategoryUpdate } from "../_vm/event/useListenCategoryUpdate";
import { CategoryId } from "../_domain/types";

const baseKey = "category";

export const getCategoryQuery = (categoryId: CategoryId) => ({
  queryKey: [baseKey, "getCategoryById", categoryId],
  queryFn: () => getCategoryAction({ categoryId }),
});

export const useCategoryQuery = (categoryId: CategoryId) => {
  const query = getCategoryQuery(categoryId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenCategoryUpdate();

  return {
    isPending,
    isSuccess,
    data,
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

export const useInvalidateCategoryList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getCategoryList"],
    });
};
