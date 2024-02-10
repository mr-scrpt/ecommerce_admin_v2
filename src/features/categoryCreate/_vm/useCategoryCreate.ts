import { CategoryEntity } from "@/entities/category/_domain/types";
import { useInvalidateCategory } from "@/entities/category/category";
import { useCategoryCreateMutation } from "../_mutation/createCategory.mutation";
import { useEmitCategoryCreate } from "./event/useEmitCategoryCreate";

export const useCategoryCreate = () => {
  const { categoryCreateEvent } = useEmitCategoryCreate();

  const onSuccess = async (category: CategoryEntity) => {
    const { id } = category;
    categoryCreateEvent(id);
  };

  const { mutateAsync, isPending, isSuccess } = useCategoryCreateMutation({
    onSuccess,
  });

  return {
    categoryCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
