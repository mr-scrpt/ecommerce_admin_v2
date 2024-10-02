import { useAppearanceDelay } from "@/shared/lib/react";
import { useConsumerRelationListQuery } from "../_query/consumerRelationList.query";

export const useConsumerRelationListModel = () => {
  const { consumerList, isPending, isSuccess, isError, isFetchedAfterMount } =
    useConsumerRelationListQuery();

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumerList,
    isAppearancePendingConsumer: isAppearancePending,
    isFetchedAfterMountConsumer: isFetchedAfterMount,
    isSuccessConsumer: isSuccess,
    isErrorConsumer: isError,
  };
};
