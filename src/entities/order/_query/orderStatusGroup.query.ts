"use client";
import { OrderRelation } from "..";
import { orderApi } from "../_api/order.api";
import { useListenOrderUpdate } from "../_vm/event/useListenOrderUpdate";

export const useOrderStatusGroupQuery = (orderId: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    orderApi.order.getRelation.useQuery<OrderRelation>({ id: orderId });

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    orderStatusGroup: data,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderStatusGroupRelation = () => {
  const invalidate = orderApi.useUtils().order.getRelation.invalidate;

  return (orderId: string) => invalidate({ id: orderId });
};
