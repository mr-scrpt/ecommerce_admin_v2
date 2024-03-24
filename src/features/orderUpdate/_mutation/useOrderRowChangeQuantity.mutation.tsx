import { useMutation } from "@tanstack/react-query";
import { useEmitOrderUpdate } from "../_vm/event/useEmitOrderUpdate";
import { addOrderRowAction } from "../_action/orderAddRow.action";
import { changeOrdewRowQuantityAction } from "../_action/orderChangeCount.action";

const baseKey = "orderAddRowMutation";

export const useOrderRowChangeQuantityMutation = () => {
  const { orderUpdateEvent } = useEmitOrderUpdate();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: changeOrdewRowQuantityAction,
    onSuccess: async ({ orderRow }) => {
      orderUpdateEvent(orderRow.orderId);
    },
  });
  return {
    orderRowChangeQuantity: mutateAsync,
    isPending,
    isSuccess,
  };
};
