"use client";

import { useAppearanceDelay } from "@/shared/lib/react";
import { useOrderWithRelationQuery } from "../..";

export const useOrderWithRelationModel = (orderId: string) => {
  const { isPending, isSuccess, order, isFetchedAfterMount, isError } =
    useOrderWithRelationQuery(orderId);

  const isAppearancePending = useAppearanceDelay(isPending);
  return {
    order,
    isAppearancePendingOrder: isAppearancePending,
    isFetchedAfterMountOrder: isFetchedAfterMount,
    isSuccessOrder: isSuccess,
    isErrorOrder: isError,
  };
};
