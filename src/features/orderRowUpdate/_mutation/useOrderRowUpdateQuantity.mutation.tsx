import { useMutation } from "@tanstack/react-query";
import { updateOrdewRowQuantityAction } from "../_action/orderRowUpdateQuantity.action";
import { useEmitOrderRowUpdate } from "../_vm/event/useEmitOrderRowUpdate";

const baseKey = "orderAddRowMutation";

export const useOrderRowUpdateQuantityMutation = () => {
  const { orderRowUpdateEvent } = useEmitOrderRowUpdate();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateOrdewRowQuantityAction,
    onSuccess: async ({ orderRow }) => {
      orderRowUpdateEvent(orderRow.orderId);
    },
  });
  return {
    orderRowUpdateQuantity: mutateAsync,
    isPending,
    isSuccess,
  };
};
