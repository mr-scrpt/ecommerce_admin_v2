import { orderRowUpdateApi } from "../_api/orderRowUpdate.api";
import { useEmitOrderRowUpdate } from "../_vm/event/useEmitOrderRowUpdate";

export const useOrderRowUpdateQuantityMutation = () => {
  const { orderRowUpdateEvent } = useEmitOrderRowUpdate();

  const { isPending, isSuccess, mutateAsync } =
    orderRowUpdateApi.orderRowUpdate.update.useMutation({
      onSuccess: async ({ id }) => {
        orderRowUpdateEvent(id);
      },
    });
  return {
    orderRowUpdateQuantity: mutateAsync,
    isPending,
    isSuccess,
  };
};
