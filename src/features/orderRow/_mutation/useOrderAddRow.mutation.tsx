import { useMutation } from "@tanstack/react-query";
import { addOrderRowAction } from "../_action/orderAddRow.action";
import { useEmitOrderRowAdd } from "../_vm/event/useEmitOrderRowAdd";

const baseKey = "orderAddRowMutation";

export const useOrderAddRowMutation = () => {
  const { orderRowAddEvent } = useEmitOrderRowAdd();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: addOrderRowAction,
    onSuccess: async ({ order }) => {
      orderRowAddEvent(order.id);
    },
  });
  return {
    orderRowAdd: mutateAsync,
    isPending,
    isSuccess,
  };
};
