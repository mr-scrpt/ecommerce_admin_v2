import { CategoryEntity } from "@/entities/category/_domain/types";
import { useMutation } from "@tanstack/react-query";
import { updateCategoryAction } from "../_action/categoryUpdate.action";

const baseKey = "categoryUpdateMutation";

interface ICategoryUpdateMutation {
  onSuccess: (category: CategoryEntity) => void;
}
export const useCategoryUpdateMutation = (props: ICategoryUpdateMutation) => {
  const { onSuccess } = props;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateCategoryAction,
    // async onSuccess({ category }, { categoryId }) {
    //   onSuccess(category, categoryId);
    // },
    async onSuccess({ category }) {
      onSuccess(category);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
