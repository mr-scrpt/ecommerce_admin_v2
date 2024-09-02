"use client";

import { useOrderRowListByOrderQuery } from "../../_query/orderRow/useOrderRowListByOrder.query";

export const useOrderRowListProductIdByOrderModel = (orderId: string) => {
  const { isPending, isSuccess, orderRowList, isFetchedAfterMount } =
    useOrderRowListByOrderQuery(orderId);

  return {
    isPending,
    isSuccess,
    orderRowListId: orderRowList?.map((orderRow) => orderRow.productId),
    isFetchedAfterMount,
  };
};
