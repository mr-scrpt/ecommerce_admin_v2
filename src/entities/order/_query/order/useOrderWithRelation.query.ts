"use client";
import { orderApi } from "../../_api/order.api";
import { OrderRelation } from "../../_domain/order/order.types";
import { useListenOrderUpdate } from "../../_vm/order/event/useListenOrderUpdate";

export const useOrderWithRelationQuery = (id: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount, isError } =
    orderApi.order.getRelation.useQuery<OrderRelation>({ id });

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    order: data ?? null,
    isFetchedAfterMount,
    isError,
  };
};

export const useInvalidateOrderWithRelation = () => {
  const queryClient = orderApi.useUtils().order.getRelation.invalidate;

  return (id: string) => queryClient({ id });
};
