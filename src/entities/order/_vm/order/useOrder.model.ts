"use client";

import { useOrderQuery } from "../../_query/order/useOrder.query";

export const useOrderModel = (orderId: string) => {
  const { isPending, isSuccess, order, isFetchedAfterMount } =
    useOrderQuery(orderId);

  // const orderStatusGroup = order
  //   ? {
  //       orderStatus: order.orderStatus,
  //       paymentStatus: order.paymentStatus,
  //     }
  //   : null;

  return {
    isPending,
    isSuccess,
    order,
    isFetchedAfterMount,
  };
};
