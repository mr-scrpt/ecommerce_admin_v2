import { useMutation } from "@tanstack/react-query";
import { updateOrderAction } from "../_action/orderUpdate.action";
import { useEmitOrderUpdate } from "../_vm/event/useEmitOrderUpdate";

const baseKey = "orderUpdateMutation";

export const useOrderUpdateMutation = () => {
  const { orderUpdateEvent } = useEmitOrderUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateOrderAction,
    onSuccess: async ({ order }) => {
      orderUpdateEvent(order.id);
    },
  });
  return {
    orderUpdate: mutateAsync,
    isPending,
  };
};
