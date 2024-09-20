import { productCreateApi } from "../_api/productCreate.api";
import { useEmitProductCreate } from "../_vm/event/useEmitProductCreate";

export const useProductCreateMutation = () => {
  const { productCreateEvent } = useEmitProductCreate();
  const { isPending, isSuccess, mutateAsync } =
    productCreateApi.productCreate.create.useMutation({
      onSuccess: async () => {
        productCreateEvent();
      },
    });
  return {
    productCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
