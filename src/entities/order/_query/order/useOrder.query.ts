"use client";
import { Order } from "@/kernel/domain/order/order.type";
import { orderApi } from "../../_api/order.api";
import { useListenOrderUpdate } from "../../_vm/order/event/useListenOrderUpdate";

export const useOrderQuery = (orderId: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    orderApi.order.get.useQuery<Order>({ id: orderId });

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    order: data ?? null,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderQuery = () => {
  const invalidate = orderApi.useUtils().order.getRelation.invalidate;

  return (orderId: string) => invalidate({ id: orderId });
};
