import { categoryRemoveApi } from "../_api/categoryRemove.api";
import { useEmitCategoryRemove } from "../_vm/event/useEmitCategoryRemove";

// const baseKey = "categoryRemoveMutation";

export const useCategoryRemoveMutation = () => {
  const { categoryRemoveEvent } = useEmitCategoryRemove();
  const { isPending, isSuccess, mutateAsync } =
    categoryRemoveApi.categoryRemove.remove.useMutation({
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
