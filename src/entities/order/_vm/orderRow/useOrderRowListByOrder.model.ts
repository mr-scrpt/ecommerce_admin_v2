"use client";

import { useOrderRowListByOrderQuery } from "../../_query/orderRow/useOrderRowListByOrder.query";

export const useOrderRowListByOrderModel = (orderId: string) => {
  const { isPending, isSuccess, orderRowList, isFetchedAfterMount } =
    useOrderRowListByOrderQuery(orderId);

  // const orderStatusGroup = order
  //   ? {
  //       orderStatus: order.orderStatus,
  //       paymentStatus: order.paymentStatus,
  //     }
  //   : null;

  return {
    isPending,
    isSuccess,
    orderRowList,
    isFetchedAfterMount,
  };
};
