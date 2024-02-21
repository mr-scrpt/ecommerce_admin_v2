import { ProductEntity } from "@/entities/product/_domain/types";
import { useMutation } from "@tanstack/react-query";
import { removeProductComplexibleAction } from "../_action/productRemoveComplexible.action";
import { useEmitProductRemove } from "..";

const baseKey = "productRemoveMutation";

export const useProductRemoveMutation = () => {
  const { productRemoveEvent } = useEmitProductRemove();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeProductComplexibleAction,
    onSuccess: async ({ product }) => {
      productRemoveEvent(product.id);
    },
  });
  return {
    productRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
