import { OrderRelation } from "@/entities/order";
import { useMemo } from "react";
import { OrderUpdateFormValues } from "../_domain/form.schema";
// import {
//   orderStatusPaymentDefaultSelectOption,
//   orderStatusStateDefaultSelectOption,
// } from "@/kernel/domain/order/form.schema";

export const useOrderDefaultValues = (
  order: OrderRelation,
): OrderUpdateFormValues => {
  const res = useMemo(() => {
    // if (!order?.orderStatusState || !order?.orderStatusPayment) {
    //   return {
    //     orderStatusStateList: [orderStatusStateDefaultSelectOption],
    //     orderStatusPaymentList: [orderStatusPaymentDefaultSelectOption],
    //   };
    // }

    const { orderStatusState, orderStatusPayment } = order;
    return {
      orderStatusStateList: [
        {
          id: orderStatusState.id,
          label: orderStatusState.status,
          value: orderStatusState.status,
        },
      ],
      orderStatusPaymentList: [
        {
          id: orderStatusPayment.id,
          label: orderStatusPayment.status,
          value: orderStatusPayment.status,
        },
      ],
    };
  }, [order]);

  return res;
};
