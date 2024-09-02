import { orderUpdateApi } from "../_api/orderUpdate.api";
import { useEmitOrderUpdateStatus } from "../_vm/event/useEmitOrderUpdateStatus";

export const useOrderUpdateMutation = () => {
  const { orderUpdateStausEvent } = useEmitOrderUpdateStatus();

  const { isPending, isSuccess, mutateAsync } =
    orderUpdateApi.orderUpdate.updateStatus.useMutation({
      onSuccess: async ({ id }) => {
        orderUpdateStausEvent(id);
      },
    });
  return {
    orderUpdate: mutateAsync,
    isPending,
    isSuccess,
  };
};
