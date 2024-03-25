import { useMutation } from "@tanstack/react-query";
import { useEmitOrderUpdate } from "../_vm/event/useEmitOrderUpdate";
import { addOrderRowAction } from "../_action/orderAddRow.action";

const baseKey = "orderAddRowMutation";

export const useOrderAddRowMutation = () => {
  const { orderUpdateEvent } = useEmitOrderUpdate();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: addOrderRowAction,
    onSuccess: async ({ order }) => {
      orderUpdateEvent(order.id);
    },
  });
  return {
    orderRowAdd: mutateAsync,
    isPending,
    isSuccess,
  };
};
