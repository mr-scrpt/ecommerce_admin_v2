"use client";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { consumerApi } from "../_api/consumer.api";
import { useListenConsumerListUpdate } from "../_vm/event/useListenConsumerListUpdate";

export const useConsumerListQuery = () => {
  const { isPending, isFetchedAfterMount, isSuccess, data, isError } =
    consumerApi.consumer.getRelationList.useQuery<Array<Consumer>>();

  useListenConsumerListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    isError,
    consumerList: data ?? [],
  };
};

export const useInvalidateConsumerList = () => {
  const invalidateUserList =
    consumerApi.useUtils().consumer.getRelationList.invalidate;

  return () => invalidateUserList();
};
