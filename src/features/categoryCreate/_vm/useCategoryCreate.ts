import { useCategoryCreateMutation } from "../_mutation/categoryCreate.mutation";
import { useEmitCategoryCreate } from "./event/useEmitCategoryCreate";

export const useCategoryCreate = () => {
  const { categoryCreateEvent } = useEmitCategoryCreate();

  const onSuccess = async () => {
    categoryCreateEvent();
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
