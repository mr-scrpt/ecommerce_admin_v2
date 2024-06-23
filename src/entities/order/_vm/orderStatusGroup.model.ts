"use client";
import { useOrderWithRelationQuery } from "..";

export const useOrderStatusGroupModel = (orderId: string) => {
  const { isPending, isSuccess, order, isFetchedAfterMount } =
    useOrderWithRelationQuery(orderId);

  const orderStatusGroup = order
    ? {
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
      }
    : null;

  return {
    isPending,
    isSuccess,
    orderStatusGroup,
    isFetchedAfterMount,
  };
};
