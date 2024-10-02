import { useAppearanceDelay } from "@/shared/lib/react";
import { useConsumerListQuery } from "../_query/consumerList.query";

export const useConsumerListModel = (id: string) => {
  const { consumerList, isPending, isSuccess, isError, isFetchedAfterMount } =
    useConsumerListQuery();

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumerList,
    isAppearancePendingConsumer: isAppearancePending,
    isFetchedAfterMountConsumer: isFetchedAfterMount,
    isSuccessConsumer: isSuccess,
    isErrorConsumer: isError,
  };
};
