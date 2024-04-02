import { useOrderCreateMutation } from "../_mutation/useCreate.mutation";

export const useOrderCreate = (orderId: string) => {
  const {
    orderCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useOrderCreateMutation();

  return {
    orderCreate: (data: OrderGroup) =>
      orderCreate({
        order: data.order,
        payment: data.payment,
      }),
    isPendingCreate,
    isSuccessCreate,
  };
};
