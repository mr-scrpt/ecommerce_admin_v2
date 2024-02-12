import { useMutation } from "@tanstack/react-query";
import { categoryCreateAction } from "../_action/categoryCreate.action";

const baseKey = "categoryCreateMutation";

interface ICategoryCreateMutation {
  onSuccess: () => void;
}

export const useCategoryCreateMutation = (props: ICategoryCreateMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: categoryCreateAction,
    async onSuccess() {
      onSuccess();
    },
  });
  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
