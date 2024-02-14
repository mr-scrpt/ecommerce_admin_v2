// "use client";
import { CategoryEntity } from "@/entities/category/_domain/types";
import { useAppSession } from "@/entities/user/session";
import { useCategoryUpdateMutation } from "../_mutation/useCategoryUpdate.mutation";
import { useEmitCategoryUpdate } from "./event/useEmitCategoryUpdate";

export const useCategoryUpdate = () => {
  const { update: updateSession } = useAppSession();

  // const invalidateCategory = useInvalidateCategory();

  const { categoryUpdateEvent } = useEmitCategoryUpdate();

  const onSuccess = async (category: CategoryEntity) => {
    const { id } = category;
    // await invalidateCategory(id);
    console.log("output_log: is id =>>>", id);
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
