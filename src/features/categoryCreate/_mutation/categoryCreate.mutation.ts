"use client";
import { categoryCreateApi } from "../_api/categoryCreate.api";
import { useEmitCategoryCreate } from "../_vm/event/useEmitCategoryCreate";

export const useCategoryCreateMutation = () => {
  const { categoryCreateEvent } = useEmitCategoryCreate();
  const { isPending, isSuccess, mutateAsync } =
    categoryCreateApi.categoryCreate.create.useMutation({
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
