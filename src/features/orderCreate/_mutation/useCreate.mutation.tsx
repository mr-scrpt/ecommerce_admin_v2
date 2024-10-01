import { Order } from "@prisma/client";
import { orderCreateApi } from "../_api/orderCreate.api";
import { useEmitOrderCreate } from "../_vm/event/useEmitOrderCreate";

export const useOrderCreateMutation = () => {
  const { orderCreateEvent: orderCreateEvent } = useEmitOrderCreate();

  const { isPending, isSuccess, mutateAsync, data } =
    orderCreateApi.orderCreate.createEmpty.useMutation<Order>({
      onSuccess: async ({ id }) => {
        orderCreateEvent(id);
      },
    });
  return {
    orderCreate: mutateAsync,
    order: data,
    isPending,
    isSuccess,
  };
};
