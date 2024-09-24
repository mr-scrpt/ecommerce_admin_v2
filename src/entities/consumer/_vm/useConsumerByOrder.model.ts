import { useAppearanceDelay } from "@/shared/lib/react";
import { useConsumerByOrderQuery } from "../_query/consumerByOrder.query";

export const useConsumerByOrderModel = (id: string) => {
  const { consumer, isPending, isSuccess, isFetchedAfterMount } =
    useConsumerByOrderQuery(id);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumer,
    isAppearancePending,
    isFetchedAfterMount,
    isSuccess,
  };
};
