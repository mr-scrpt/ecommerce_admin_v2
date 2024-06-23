import { OrderStatusGroup } from "@/entities/order/_domain/order.types";
import { useOrderUpdateStatusMutation } from "../_mutation/useOrderStatusUpdate.mutation";

export const useOrderUpdateStatusModel = (orderId: string) => {
  const {
    orderUpdateStatus,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useOrderUpdateStatusMutation();

  return {
    orderUpdateStatus: (data: OrderStatusGroup) =>
      orderUpdateStatus({
        selector: { id: orderId },
        orderStatusData: data.orderStatus,
        orderPaymentStatusData: data.paymentStatus,
      }),
    isPendingUpdate,
    isSuccessUpdate,
  };
};
