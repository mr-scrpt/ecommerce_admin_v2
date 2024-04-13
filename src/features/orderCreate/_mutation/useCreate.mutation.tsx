import { useMutation } from "@tanstack/react-query";
import { createOrderAction } from "../_action/orderCreate.action";
import { useEmitOrderCreate } from "../_vm/event/useEmitOrderCreate";

const baseKey = "orderCreateMutation";

export const useOrderCreateMutation = () => {
  const { orderCreateStausEvent } = useEmitOrderCreate();
  //
  const { isPending, isSuccess, mutateAsync, data } = useMutation({
    mutationKey: [baseKey],
    mutationFn: createOrderAction,
    onSuccess: async ({ order }) => {
      orderCreateStausEvent(order.id);
    },
  });
  return {
    orderCreate: mutateAsync,
    order: data?.order,
    isPending,
    isSuccess,
  };
};
