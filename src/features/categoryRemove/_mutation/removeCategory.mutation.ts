import { CategoryEntity } from "@/entities/category/_domain/types";
import { useMutation } from "@tanstack/react-query";
import { removeCategoryComplexibleAction } from "../_action/removeCategoryComplexible.action";

const baseKey = "categoryRemoveMutation";

interface ICategoryRemoveMutation {
  onSuccess: (category: CategoryEntity) => void;
}

export const useCategoryRemoveMutation = (props: ICategoryRemoveMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeCategoryComplexibleAction,
    async onSuccess({ category }) {
      onSuccess(category);
    },
  });
  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
