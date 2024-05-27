import { categoryUpdateApi } from "../_api/categoryUpdate.api";
import { useEmitCategoryUpdate } from "../_vm/event/useEmitCategoryUpdate";

export const useCategoryUpdateMutation = () => {
  const { categoryUpdateEvent } = useEmitCategoryUpdate();

  const { mutateAsync, isPending } =
    categoryUpdateApi.categoryUpdate.update.useMutation({
      onSuccess: async ({ id }) => {
        categoryUpdateEvent(id);
      },
    });
  return {
    categoryUpdate: mutateAsync,
    isPending,
  };
};
