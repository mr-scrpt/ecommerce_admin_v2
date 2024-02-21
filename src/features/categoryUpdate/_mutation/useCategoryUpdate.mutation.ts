import { useMutation } from "@tanstack/react-query";
import { updateCategoryAction } from "../_action/categoryUpdate.action";
import { useEmitCategoryUpdate } from "../_vm/event/useEmitCategoryUpdate";

const baseKey = "categoryUpdateMutation";

export const useCategoryUpdateMutation = () => {
  const { categoryUpdateEvent } = useEmitCategoryUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateCategoryAction,
    onSuccess: async ({ category }) => {
      categoryUpdateEvent(category.id);
    },
  });
  return {
    categoryUpdate: mutateAsync,
    isPending,
  };
};
