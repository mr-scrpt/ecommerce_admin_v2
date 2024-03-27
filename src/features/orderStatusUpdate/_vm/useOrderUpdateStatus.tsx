import { OrderStatusGroup } from "@/entities/order/_domain/order.types";
import { useOrderUpdateStatusMutation } from "../_mutation/useOrderStatusUpdate.mutation";

export const useOrderUpdateStatus = (orderId: string) => {
  const {
    orderUpdateStatus,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useOrderUpdateStatusMutation();

  return {
    orderUpdateStatus: (data: OrderStatusGroup) =>
      orderUpdateStatus({
        orderId,
        orderStatus: data.orderStatus,
        paymentStatus: data.paymentStatus,
      }),
    isPendingUpdate,
    isSuccessUpdate,
  };
};
