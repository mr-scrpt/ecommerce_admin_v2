import { useOrderWithRelationModel } from "@/entities/order";
import {
  buildOrderPaymentStatusOptionsArray,
  buildOrderStateStatusOptionsArray,
} from "@/kernel/domain/order/form.schema";
import { OrderUpdateFormValues } from "../_domain/form.schema";

// interface UseOrderUpdateValues {
//   orderUpdateValues: OrderUpdateFormValues;
//   isAppearancePendingOrder: boolean;
//   isFetchedAfterMountOrder: boolean;
//   isSuccessOrder: boolean;
// }

export const useOrderUpdateValues = (orderId: string) => {
  const {
    order,
    isAppearancePendingOrder,
    isFetchedAfterMountOrder,
    isSuccessOrder,
  } = useOrderWithRelationModel(orderId);

  const { orderStatusState, orderStatusPayment } = order || {};

  const orderUpdateValues: OrderUpdateFormValues = {
    orderStatusStateList: buildOrderStateStatusOptionsArray([orderStatusState]),
    orderStatusPaymentList: buildOrderPaymentStatusOptionsArray([
      orderStatusPayment,
    ]),
  };

  return {
    orderUpdateValues,
    isAppearancePendingOrder,
    isFetchedAfterMountOrder,
    isSuccessOrder,
  };
};
