import { deliveryUpdateApi } from "../_api/orderDeliveryUpdate.api";
import { useEmitDeliveryUpdate } from "../_vm/event/useEmitDeliveryUpdate";

export const useDeliveryUpdateMutation = () => {
  const { deliveryUpdateEvent } = useEmitDeliveryUpdate();

  const { mutateAsync, isPending } =
    deliveryUpdateApi.deliveryUpdate.update.useMutation({
      onSuccess: async (delivery) => {
        deliveryUpdateEvent(delivery);
      },
    });
  return {
    mutateAsync,
    isPending,
  };
};
