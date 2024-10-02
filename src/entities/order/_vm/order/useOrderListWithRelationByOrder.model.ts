"use client";

import { useAppearanceDelay } from "@/shared/lib/react";
import { useOrderListWithRelationByOrderQuery } from "../../_query/order/useOrderListWithRelationByOrder.query";

export const useOrderListWithRelationByOrderModel = (id: string) => {
  const { isPending, isSuccess, orderList, isFetchedAfterMount, isError } =
    useOrderListWithRelationByOrderQuery(id);

  const isAppearancePending = useAppearanceDelay(isPending);
  return {
    orderList,
    isAppearancePendingOrder: isAppearancePending,
    isFetchedAfterMountOrder: isFetchedAfterMount,
    isSuccessOrder: isSuccess,
    isErrorOrder: isError,
  };
};
