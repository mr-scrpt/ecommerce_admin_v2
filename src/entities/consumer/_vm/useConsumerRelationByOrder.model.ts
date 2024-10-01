import { useAppearanceDelay } from "@/shared/lib/react";
import { useConsumerRelationByOrderQuery } from "../_query/consumerRelationByOrder.query";

export const useConsumerRelationByOrderModel = (orderId: string) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    useConsumerRelationByOrderQuery(orderId);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumer: data ?? null,
    isFetchedAfterMount,
    isAppearancePending,
    isSuccess,
  };
};
