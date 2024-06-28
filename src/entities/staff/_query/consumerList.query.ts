"use client";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { consumerApi } from "../_api/staff.api";
import { useListenConsumerListUpdate } from "../_vm/event/useListenConsumerListUpdate";

export const useConsumerListQuery = () => {
  const { isPending, isFetchedAfterMount, isSuccess, data } =
    consumerApi.consumer.getList.useQuery<Array<Consumer>>();

  useListenConsumerListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    consumerList: data ?? [],
  };
};

export const useInvalidateConsumerList = () => {
  const invalidateUserList = consumerApi.useUtils().consumer.getList.invalidate;

  return () => invalidateUserList();
};
