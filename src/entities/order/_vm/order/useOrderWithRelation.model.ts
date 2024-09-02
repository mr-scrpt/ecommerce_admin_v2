"use client";

import { useOrderWithRelationQuery } from "../..";

export const useOrderWithRelationModel = (orderId: string) => {
  const { isPending, isSuccess, order, isFetchedAfterMount } =
    useOrderWithRelationQuery(orderId);

  return {
    isPending,
    isSuccess,
    order,
    isFetchedAfterMount,
  };
};
