"use client";
import { orderApi } from "../../_api/order.api";
import { useListenOrderListUpdate } from "../../_vm/order/event/useListenOrderListUpdate";

export const useOrderListWithRelationByConsumerQuery = (consumerId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    orderApi.order.getListByConsumer.useQuery({ consumerId });

  useListenOrderListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: data ?? [],
  };
};

export const useInvalidateOrderListWithRelationByConsumer = () => {
  const invalidateOrder =
    orderApi.useUtils().order.getListByConsumer.invalidate;

  return (consumerId: string) => invalidateOrder({ consumerId });
};
