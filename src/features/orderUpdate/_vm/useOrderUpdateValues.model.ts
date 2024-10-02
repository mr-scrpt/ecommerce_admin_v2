import { useOrderWithRelationModel } from "@/entities/order";
import {
  buildOrderPaymentStatusOptionsArray,
  buildOrderStateStatusOptionsArray,
} from "@/kernel/domain/order/form.schema";
import { OrderUpdateFormValues } from "../_domain/form.schema";

interface UseOrderUpdateValues {
  orderUpdateValues: OrderUpdateFormValues;
  isPendingOrderData: boolean;
  isFetchedAfterMountOrderData: boolean;
  isSuccessOrderData: boolean;
}

export const useOrderUpdateValues = (orderId: string): UseOrderUpdateValues => {
  const {
    order,
    isPending: isPendingOrderData,
    isFetchedAfterMount: isFetchedAfterMountOrderData,
    isSuccess: isSuccessOrderData,
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
    isPendingOrderData,
    isFetchedAfterMountOrderData,
    isSuccessOrderData,
  };
};