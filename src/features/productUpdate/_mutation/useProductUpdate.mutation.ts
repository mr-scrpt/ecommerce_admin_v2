import { useEmitProductUpdate } from "..";
import { productUpdateApi } from "../_api/productUpdate.api";

export const useProductUpdateMutation = () => {
  const { productUpdateEvent } = useEmitProductUpdate();

  const { mutateAsync, isPending, isSuccess } =
    productUpdateApi.productUpdate.update.useMutation({
      onSuccess: async ({ id }) => {
        productUpdateEvent(id);
      },
    });
  return {
    productUpdate: mutateAsync,
    isPending,
    isSuccess,
  };
};
