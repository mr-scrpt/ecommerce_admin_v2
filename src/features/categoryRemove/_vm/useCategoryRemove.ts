import { CategoryEntity } from "@/entities/category";
import { useCategoryRemoveMutation } from "../_mutation/categoryRemove.mutation";
import { useEmitCategoryRemove } from "./event/useEmitCategoryRemove";

export const useCategoryRemove = () => {
  const { categoryRemoveEvent } = useEmitCategoryRemove();

  const onSuccess = async (category: CategoryEntity) => {
    const { id } = category;
    categoryRemoveEvent(id);
  };

  const { mutateAsync, isPending, isSuccess } = useCategoryRemoveMutation({
    onSuccess,
  });

  return {
    categoryRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
