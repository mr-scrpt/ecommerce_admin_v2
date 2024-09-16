"use client";
import { OrderStatusList } from "@/kernel/domain/order/orderStatus.type";
import { orderApi } from "../../_api/order.api";
import { useListenOrderUpdate } from "../../_vm/order/event/useListenOrderUpdate";

export const useOrderStatusListQuery = () => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    orderApi.order.getStatusAvailable.useQuery<OrderStatusList>();

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    orderStatusList: data ?? null,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderStatusListQuery = () => {
  const invalidate = orderApi.useUtils().order.getStatusAvailable.invalidate;

  return () => invalidate();
};
