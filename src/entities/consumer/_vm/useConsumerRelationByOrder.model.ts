import { useAppearanceDelay } from "@/shared/lib/react";
import { useConsumerRelationByOrderQuery } from "../_query/consumerRelationByOrder.query";

export const useConsumerRelationByOrderModel = (orderId: string) => {
  const { data, isPending, isSuccess, isFetchedAfterMount, isError } =
    useConsumerRelationByOrderQuery(orderId);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumer: data ?? null,
    isAppearancePendingConsumer: isAppearancePending,
    isFetchedAfterMountConsumer: isFetchedAfterMount,
    isSuccessConsumer: isSuccess,
    isErrorConsumer: isError,
  };
};
