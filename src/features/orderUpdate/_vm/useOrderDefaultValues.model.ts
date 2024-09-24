import { useOrderWithRelationModel } from "@/entities/order";
import { useMemo } from "react";
import {
  OrderUpdateFormValues,
  orderUpdateFieldsValues,
} from "../_domain/form.schema";

interface UseOrderDefaultValues {
  orderUpdateValues: OrderUpdateFormValues;
  isPendingOrderData: boolean;
  isFetchedAfterMountOrderData: boolean;
  isSuccessOrderData: boolean;
}

export const useOrderDefaultValues = (
  orderId: string,
): UseOrderDefaultValues => {
  const {
    order,
    isPending: isPendingOrderData,
    isFetchedAfterMount: isFetchedAfterMountOrderData,
    isSuccess: isSuccessOrderData,
  } = useOrderWithRelationModel(orderId);

  // const res = useMemo(() => {
  if (!order) {
    return {
      orderUpdateValues: orderUpdateFieldsValues,
      isPendingOrderData,
      isFetchedAfterMountOrderData,
      isSuccessOrderData,
    };
  }

  const { orderStatusState, orderStatusPayment } = order;

  return {
    orderUpdateValues: {
      orderStatusStateList: [
        {
          value: orderStatusState.id,
          label: orderStatusState.status,
        },
      ],
      orderStatusPaymentList: [
        {
          value: orderStatusPayment.id,
          label: orderStatusPayment.status,
        },
      ],
    },
    isPendingOrderData,
    isFetchedAfterMountOrderData,
    isSuccessOrderData,
  };
  // }, [orderId]);

  // return res;
};
