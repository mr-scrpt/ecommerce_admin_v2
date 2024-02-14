import { ProductEntity } from "@/entities/product/_domain/types";
import { useMutation } from "@tanstack/react-query";
import { updateProductAction } from "../_action/productUpdate.action";

const baseKey = "productUpdateMutation";

interface IProductUpdateMutation {
  onSuccess: (product: ProductEntity) => void;
}
export const useProductUpdateMutation = (props: IProductUpdateMutation) => {
  const { onSuccess } = props;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateProductAction,
    // async onSuccess({ product }, { productId }) {
    //   onSuccess(product, productId);
    // },
    async onSuccess({ product }) {
      onSuccess(product);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
