import { useMutation } from "@tanstack/react-query";
import { updateOrderStatusAction } from "../_action/orderStatusUpdate.action";
import { useEmitOrderUpdateStatus } from "../_vm/event/useEmitOrderUpdateStatus";

const baseKey = "orderUpdateStatusMutation";

export const useOrderUpdateStatusMutation = () => {
  const { orderUpdateStausEvent } = useEmitOrderUpdateStatus();
  //
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateOrderStatusAction,
    onSuccess: async ({ order }) => {
      orderUpdateStausEvent(order.id);
    },
  });
  return {
    orderUpdateStatus: mutateAsync,
    isPending,
    isSuccess,
  };
};
