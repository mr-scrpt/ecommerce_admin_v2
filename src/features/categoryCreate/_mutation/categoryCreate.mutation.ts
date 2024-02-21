import { useMutation } from "@tanstack/react-query";
import { categoryCreateAction } from "../_action/categoryCreate.action";
import { useEmitCategoryCreate } from "../_vm/event/useEmitCategoryCreate";

const baseKey = "categoryCreateMutation";

export const useCategoryCreateMutation = () => {
  const { categoryCreateEvent } = useEmitCategoryCreate();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: categoryCreateAction,
    onSuccess: async () => {
      categoryCreateEvent();
    },
  });
  return {
    categoryCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
