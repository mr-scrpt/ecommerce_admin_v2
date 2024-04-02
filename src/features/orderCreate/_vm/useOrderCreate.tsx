import { OrderGroup } from "@/entities/order/_domain/order.types";
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
        orderId,
        order: data.order,
        payment: data.payment,
      }),
    isPendingCreate,
    isSuccessCreate,
  };
};
