import { useMutation } from "@tanstack/react-query";
import { useEmitProductUpdate } from "..";
import { updateProductAction } from "../_action/productUpdate.action";

const baseKey = "productUpdateMutation";

export const useProductUpdateMutation = () => {
  const { productUpdateEvent } = useEmitProductUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateProductAction,

    onSuccess: async ({ product }) => {
      productUpdateEvent(product.id);
    },
  });
  return {
    productUpdate: mutateAsync,
    isPending,
  };
};
