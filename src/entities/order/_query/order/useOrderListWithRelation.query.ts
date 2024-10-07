"use client";
import { orderApi } from "../../_api/order.api";
import { useListenOrderListUpdate } from "../../_vm/order/event/useListenOrderListUpdate";

export const useOrderListWithRelationQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data, isError } =
    orderApi.order.getListRelation.useQuery();

  useListenOrderListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    isError,
    orderList: data ?? [],
  };
};

export const useInvalidateOrderListWithRelation = () => {
  const invalidateOrder = orderApi.useUtils().order.getListByOrder.invalidate;

  return (id: string) => invalidateOrder({ id });
};
