import { orderUpdateApi } from "../_api/orderUpdate.api";
import { useEmitOrderRowCreate } from "../_vm/event/useEmitOrderRowCreate";

export const useOrderRowCreateMutation = () => {
  const { orderRowCreateEvent } = useEmitOrderRowCreate();

  const { isPending, isSuccess, mutateAsync } =
    orderUpdateApi.orderCreateRow.create.useMutation({
      onSuccess: async ({ id }) => {
        orderRowCreateEvent(id);
      },
    });
  return {
    orderRowCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
