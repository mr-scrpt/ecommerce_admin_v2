import { Order } from "@/entities/order";
import { orderCreateApi } from "../_api/orderCreate.api";
import { useEmitOrderCreate } from "../_vm/event/useEmitOrderCreate";

export const useOrderCreateMutation = () => {
  const { orderCreateStausEvent } = useEmitOrderCreate();
  //
  const { isPending, isSuccess, mutateAsync, data } =
    orderCreateApi.orderCreate.createEmpty.useMutation<Order>({
      onSuccess: async ({ id }) => {
        orderCreateStausEvent(id);
      },
    });
  return {
    orderCreate: mutateAsync,
    order: data,
    isPending,
    isSuccess,
  };
};
