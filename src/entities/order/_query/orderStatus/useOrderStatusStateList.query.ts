"use client";
import { OrderStatusState } from "@/kernel/domain/order/orderStatus.type";
import { orderApi } from "../../_api/order.api";
import { useListenOrderUpdate } from "../../_vm/order/event/useListenOrderUpdate";

export const useOrderStatusStateListQuery = () => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    orderApi.order.getStatusStateList.useQuery<Array<OrderStatusState>>();

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    orderStatusStateList: data ?? [],
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderStatusListQuery = () => {
  const invalidate = orderApi.useUtils().order.getStatusStateList.invalidate;

  return () => invalidate();
};
