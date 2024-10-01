import { useAppearanceDelay } from "@/shared/lib/react";
import { useConsumerQuery } from "../_query/consumer.query";

export const useConsumerModel = (id: string) => {
  const { consumer, isPending, isSuccess, isError, isFetchedAfterMount } =
    useConsumerQuery(id);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumer,
    isAppearancePendingConsumer: isAppearancePending,
    isFetchedAfterMountConsumer: isFetchedAfterMount,
    isSuccessConsumer: isSuccess,
    isErrorConsumer: isError,
  };
};

// // TODO: is correct way?
// if (isAppearancePending) {
//   return <Loader className="animate-spin" />;
// }
//
// if (isSuccess && !consumer) {
//   return <div>Consumer not found</div>;
// }
