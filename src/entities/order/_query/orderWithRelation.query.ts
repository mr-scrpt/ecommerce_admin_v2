"use client";
import { orderApi } from "../_api/order.api";
import { OrderRelation } from "../_domain/order.types";
import { useListenOrderUpdate } from "../_vm/event/useListenOrderUpdate";

export const useOrderWithRelationQuery = (id: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    orderApi.order.getRelation.useQuery<OrderRelation>({ id });

  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    order: data,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderWithRelation = () => {
  const queryClient = orderApi.useUtils().order.getRelation.invalidate;

  return (id: string) => queryClient({ id });
};
