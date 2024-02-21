import { useMutation } from "@tanstack/react-query";
import { removeCategoryComplexibleAction } from "../_action/categoryRemoveComplexible.action";
import { useEmitCategoryRemove } from "../_vm/event/useEmitCategoryRemove";

const baseKey = "categoryRemoveMutation";

export const useCategoryRemoveMutation = () => {
  const { categoryRemoveEvent } = useEmitCategoryRemove();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeCategoryComplexibleAction,
    onSuccess: ({ category }) => {
      categoryRemoveEvent(category.id);
    },
  });
  return {
    categoryRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
