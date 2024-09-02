"use client";
import { orderApi } from "../../_api/order.api";
import { useListenOrderListUpdate } from "../../_vm/order/event/useListenOrderListUpdate";

export const useOrderListQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    orderApi.order.getList.useQuery();

  useListenOrderListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: data ?? [],
  };
};

export const useInvalidateOrderList = () => {
  const invalidateOrder = orderApi.useUtils().order.getList.invalidate;

  return () => invalidateOrder();
};
