import { useMutation } from "@tanstack/react-query";
import { addOrderRowAction } from "../_action/orderRemoveRow.action";
import { useEmitOrderRowRemove } from "../_vm/event/useEmitOrderRowRemove";

const baseKey = "orderAddRowMutation";

export const useOrderAddRowMutation = () => {
  const { orderRowRemoveEvent } = useEmitOrderRowRemove();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: addOrderRowAction,
    onSuccess: async ({ order }) => {
      orderRowRemoveEvent(order.id);
    },
  });
  return {
    orderRowAdd: mutateAsync,
    isPending,
    isSuccess,
  };
};
