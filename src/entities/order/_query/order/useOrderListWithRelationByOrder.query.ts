"use client";
import { orderApi } from "../../_api/order.api";
import { useListenOrderListUpdate } from "../../_vm/order/event/useListenOrderListUpdate";

export const useOrderListWithRelationByOrderQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    orderApi.order.getListByOrder.useQuery({ id });

  useListenOrderListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: data ?? [],
  };
};

export const useInvalidateOrderListWithRelationByOrder = () => {
  const invalidateOrder = orderApi.useUtils().order.getListByOrder.invalidate;

  return (id: string) => invalidateOrder({ id });
};
