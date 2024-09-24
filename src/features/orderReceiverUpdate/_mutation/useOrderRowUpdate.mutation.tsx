import { orderReceiverUpdateApi } from "../_api/orderReceiverUpdate.api";
import { useEmitOrderReceiverUpdate } from "../_vm/event/useEmitOrderReceiverUpdate";

export const useOrderReceiverUpdateMutation = () => {
  const { orderReceiverUpdateEvent } = useEmitOrderReceiverUpdate();

  const { isPending, isSuccess, mutateAsync } =
    orderReceiverUpdateApi.orderReceiverUpdate.update.useMutation({
      onSuccess: async ({ id }) => {
        orderReceiverUpdateEvent(id);
      },
    });
  return {
    orderReceiverUpdate: mutateAsync,
    isPending,
    isSuccess,
  };
};
