import { useMutation } from "@tanstack/react-query";
import { removeOrderRowAction } from "../_action/orderRemoveRow.action";
import { useEmitOrderRowRemove } from "../_vm/event/useEmitOrderRowRemove";

const baseKey = "orderRemoveRowMutation";

export const useOrderRowRowMutation = () => {
  const { orderRowRemoveEvent } = useEmitOrderRowRemove();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: removeOrderRowAction,
    onSuccess: async ({ order }) => {
      orderRowRemoveEvent(order.id);
    },
  });
  return {
    orderRowRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
