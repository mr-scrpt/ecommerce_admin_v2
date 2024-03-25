import { useMutation } from "@tanstack/react-query";
import { useEmitOrderUpdate } from "../_vm/event/useEmitOrderUpdate";
import { updateOrdewRowQuantityAction } from "../_action/orderRowUpdateQuantity.action";

const baseKey = "orderAddRowMutation";

export const useOrderRowUpdateQuantityMutation = () => {
  const { orderUpdateEvent } = useEmitOrderUpdate();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateOrdewRowQuantityAction,
    onSuccess: async ({ orderRow }) => {
      orderUpdateEvent(orderRow.orderId);
    },
  });
  return {
    orderRowUpdateQuantity: mutateAsync,
    isPending,
    isSuccess,
  };
};
