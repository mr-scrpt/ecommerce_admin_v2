"use client";
import { receiverApi } from "../_api/receiver.api";
import { ReceiverRelation } from "../_domain/receiver.types";
import { useListenReceiverRelation } from "../_vm/event/useListenReceiverRelation";

export const useReceiverRelation = (id: string) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    receiverApi.receiver.getRelation.useQuery<ReceiverRelation>({
      id,
    });

  useListenReceiverRelation();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    receiverList: data ?? [],
  };
};

export const useInvalidateReceiverRelation = () => {
  const invalidateReceiver =
    receiverApi.useUtils().receiver.getRelation.invalidate;
  return (id: string) => invalidateReceiver({ id });
};
