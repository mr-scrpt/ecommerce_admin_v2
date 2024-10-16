"use client";
import { buildSuccessNotice } from "@/shared/ui/notice/notice";
import { categoryUpdateApi } from "../_api/categoryUpdate.api";
import { useEmitCategoryUpdate } from "../_vm/event/useEmitCategoryUpdate";
import { CATEGORY_MESSAGE } from "@/kernel/domain/category/category.message";

export const useCategoryUpdateMutation = () => {
  const { categoryUpdateEvent } = useEmitCategoryUpdate();

  const { mutateAsync, isPending, isSuccess } =
    categoryUpdateApi.categoryUpdate.update.useMutation({
      onSuccess: async ({ id }) => {
        categoryUpdateEvent(id);
        buildSuccessNotice(CATEGORY_MESSAGE.UPDATE_SUCCESS);
      },
    });
  return {
    categoryUpdate: mutateAsync,
    isPending,
    isSuccess,
  };
};
