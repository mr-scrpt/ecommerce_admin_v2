import { useEmitProductRemove } from "..";
import { productRemoveApi } from "../_api/productRemove.api";

export const useProductRemoveMutation = () => {
  const { productRemoveEvent } = useEmitProductRemove();
  const { isPending, isSuccess, mutateAsync } =
    productRemoveApi.productRemove.remove.useMutation({
      onSuccess: async ({ id }) => {
        productRemoveEvent(id);
      },
    });
  return {
    productRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
