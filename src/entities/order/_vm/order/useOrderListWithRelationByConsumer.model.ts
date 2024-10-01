"use client";

import { useOrderListWithRelationByConsumerQuery } from "../../_query/order/useOrderListWithRelationByConsumer.query";

export const useOrderListWithRelationByConsumerModel = (consumerId: string) => {
  const { isPending, isSuccess, orderList, isFetchedAfterMount } =
    useOrderListWithRelationByConsumerQuery(consumerId);

  return {
    isPending,
    isSuccess,
    orderList,
    isFetchedAfterMount,
  };
};
