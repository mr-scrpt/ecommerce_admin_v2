import { orderRowCreateApi } from "../_api/orderRowCreate.api";
import { useEmitOrderRowAdd } from "../_vm/event/useEmitOrderRowAdd";

export const useOrderRowCreateMutation = () => {
  const { orderRowAddEvent } = useEmitOrderRowAdd();
  //
  const { isPending, isSuccess, mutateAsync } =
    orderRowCreateApi.orderRowCreate.create.useMutation({
      onSuccess: async ({ id }) => {
        orderRowAddEvent(id);
      },
    });
  return {
    orderRowAdd: mutateAsync,
    isPending,
    isSuccess,
  };
};
