"use client";

import { useOrderQuery } from "../../_query/order/useOrder.query";

export const useOrderModel = (orderId: string) => {
  const { isPending, isSuccess, isError, order, isFetchedAfterMount } =
    useOrderQuery(orderId);

  // const orderStatusGroup = order
  //   ? {
  //       orderStatus: order.orderStatus,
  //       paymentStatus: order.paymentStatus,
  //     }
  //   : null;

  return {
    isPendingOrder: isPending,
    isSuccessOrder: isSuccess,
    isErrorOrder: isError,
    order,
    isFetchedAfterMount,
  };
};
