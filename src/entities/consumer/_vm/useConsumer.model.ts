import { useAppearanceDelay } from "@/shared/lib/react";
import { useConsumerQuery } from "../_query/consumer.query";

export const useGetConsumerModel = (id: string) => {
  const { consumer, isPending, isSuccess, isFetchedAfterMount } =
    useConsumerQuery(id);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumer,
    isAppearancePending,
    isFetchedAfterMount,
    isSuccess,
  };
};
