import { Category } from "@/kernel/domain/category/category.type";
import { categoryRemoveApi } from "../_api/categoryRemove.api";
import { useEmitCategoryRemove } from "../_vm/event/useEmitCategoryRemove";

export const useCategoryRemoveMutation = () => {
  const { categoryRemoveEvent } = useEmitCategoryRemove();
  const { isPending, isSuccess, mutateAsync } =
    categoryRemoveApi.categoryRemove.remove.useMutation<Category>({
      onSuccess: ({ id }) => {
        categoryRemoveEvent(id);
      },
    });

  return {
    categoryRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
