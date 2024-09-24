import { OrderStatusPaymentDefaultSelectOption } from "@/kernel/domain/order/form.schema";
import { useMemo } from "react";
import { useOrderStatusPaymentListQuery } from "../../_query/orderStatus/useOrderStatusPaymentList.query";

export const useOrderStatusPaymentToSelectModel = () => {
  const { orderStatusPaymentList, isPending, isSuccess, isFetchedAfterMount } =
    useOrderStatusPaymentListQuery();

  const orderStatusPaymentListToSelect: Array<OrderStatusPaymentDefaultSelectOption> =
    useMemo(
      () =>
        orderStatusPaymentList.map((item) => ({
          value: item.id,
          label: item.status,
        })),
      [orderStatusPaymentList],
    );
  return {
    orderStatusPaymentListToSelect,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  };
};
