import { ProductEntity } from "@/entities/product";
import { useProductRemoveMutation } from "../_mutation/removeProduct.mutation";
import { useEmitProductRemove } from "./event/useEmitProductRemove";

export const useProductRemove = () => {
  const { productRemoveEvent } = useEmitProductRemove();

  const onSuccess = async (product: ProductEntity) => {
    const { id } = product;
    productRemoveEvent(id);
  };

  const { mutateAsync, isPending, isSuccess } = useProductRemoveMutation({
    onSuccess,
  });

  return {
    productRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
