import { useMutation } from "@tanstack/react-query";
import { productCreateAction } from "../_action/productCreate.action";

const baseKey = "productCreateMutation";

interface IProductCreateMutation {
  onSuccess: () => void;
}

export const useProductCreateMutation = (props: IProductCreateMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: productCreateAction,
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
