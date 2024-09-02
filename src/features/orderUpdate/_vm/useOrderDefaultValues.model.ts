import { Order } from "@/kernel/domain/order/order.type";
import { useMemo } from "react";

export const useOrderDefaultValues = (order: Order | null) => {
  return useMemo(() => {
    if (!order) {
      return {
        orderStatusList: [],
        orderPaymentStatusList: [],
      };
    }

    return {
      orderStatusList: [
        {
          label: order.orderStatus,
          value: order.orderStatus,
        },
      ],
      OrderPaymentStatusList: [
        {
          label: order.paymentStatus,
          value: order.paymentStatus,
        },
      ],
    };
  }, [order]);
};
