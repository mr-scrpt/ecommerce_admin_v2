"use client";
import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { receiverApi } from "../_api/receiver.api";
import { useListenReceiverListByUserUpdate } from "../_vm/event/useListenAddressListUpdateByUser";

export const useReceiverListByUser = (userId: string) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    receiverApi.receiver.getListByUser.useQuery<Array<Receiver>>({ userId });

  useListenReceiverListByUserUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    receiverList: data ?? [],
  };
};

export const useInvalidateReceiverListByUser = () => {
  const invalidateReceiver =
    receiverApi.useUtils().receiver.getListByUser.invalidate;
  return (userId: string) => invalidateReceiver({ userId });
};
