import { orderRowRemoveApi } from "../_api/orderRowRemove.api";
import { useEmitOrderRowRemove } from "../_vm/event/useEmitOrderRowRemove";

export const useOrderRowRowMutation = () => {
  const { orderRowRemoveEvent } = useEmitOrderRowRemove();

  const { isPending, isSuccess, mutateAsync } =
    orderRowRemoveApi.orderRowRemove.remove.useMutation({
      onSuccess: async ({ id }) => {
        orderRowRemoveEvent(id);
      },
    });
  return {
    orderRowRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
