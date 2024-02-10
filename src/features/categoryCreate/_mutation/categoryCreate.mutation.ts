import { Category } from "@/entities/category/_domain/types";
import { useMutation } from "@tanstack/react-query";
import { categoryCreateAction } from "../_action/categoryCreate.action";

const baseKey = "categoryCreateMutation";

interface ICategoryCreateMutation {
  onSuccess: (category: Category) => void;
}

export const useCategoryCreateMutation = (props: ICategoryCreateMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: categoryCreateAction,
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
