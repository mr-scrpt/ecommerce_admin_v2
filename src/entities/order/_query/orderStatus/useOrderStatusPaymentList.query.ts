"use client";
import { OrderStatusPayment } from "@/kernel/domain/order/orderStatus.type";
import { orderApi } from "../../_api/order.api";
import { useListenOrderUpdate } from "../../_vm/order/event/useListenOrderUpdate";

export const useOrderStatusPaymentListQuery = () => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    orderApi.order.getStatusPaymentList.useQuery<Array<OrderStatusPayment>>();

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    orderStatusPaymentList: data ?? [],
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderStatusListQuery = () => {
  const invalidate = orderApi.useUtils().order.getStatusPaymentList.invalidate;

  return () => invalidate();
};
