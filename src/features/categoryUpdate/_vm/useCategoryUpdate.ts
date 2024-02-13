// "use client";
import { CategoryEntity } from "@/entities/category/_domain/types";
import { useCategoryUpdateMutation } from "../_mutation/useCategoryUpdate.mutation";
import { useEmitCategoryUpdate } from "./event/useEmitCategoryUpdate";
import { useAppSession } from "@/entities/user/session";

export const useCategoryUpdate = () => {
  const { update: updateSession } = useAppSession();

  // const invalidateCategory = useInvalidateCategory();

  const { categoryUpdateEvent } = useEmitCategoryUpdate();

  const onSuccess = async (category: CategoryEntity) => {
    const { id } = category;
    // await invalidateCategory(id);
    await updateSession({
      category,
    });
    categoryUpdateEvent(id);
  };

  const { mutateAsync, isPending } = useCategoryUpdateMutation({ onSuccess });

  return {
    // categoryUpdateEvent,
    categoryUpdate: mutateAsync,
    isPending,
  };
};
