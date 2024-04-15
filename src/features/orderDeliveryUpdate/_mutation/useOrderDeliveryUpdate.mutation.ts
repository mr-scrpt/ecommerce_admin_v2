import { useMutation } from "@tanstack/react-query";
import { updateOrderDeliveryAction } from "../_action/orderDeliveryUpdate.action";
import { Delivery } from "@/entities/delivery";
import { useEmitOrderDeliveryUpdate } from "../_vm/event/useEmitOrderDeliveryUpdate";

const baseKey = "orderDeliveryUpdateMutation";

interface IOrderDeliveryUpdateMutation {
  onSuccess: (delivery: Delivery) => void;
}
export const useOrderDeliveryUpdateMutation = (
  props: IOrderDeliveryUpdateMutation,
) => {
  const { onSuccess } = props;
  const { deliveryUpdateEvent } = useEmitOrderDeliveryUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateOrderDeliveryAction,
    onSuccess: async ({ delivery }) => {
      onSuccess(delivery);
      deliveryUpdateEvent(delivery.id);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
