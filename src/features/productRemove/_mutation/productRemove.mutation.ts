import { ProductEntity } from "@/entities/product/_domain/types";
import { useMutation } from "@tanstack/react-query";
import { removeProductComplexibleAction } from "../_action/productRemoveComplexible.action";

const baseKey = "productRemoveMutation";

interface IProductRemoveMutation {
  onSuccess: (product: ProductEntity) => void;
}

export const useProductRemoveMutation = (props: IProductRemoveMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeProductComplexibleAction,
    async onSuccess({ product }) {
      onSuccess(product);
    },
  });
  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
