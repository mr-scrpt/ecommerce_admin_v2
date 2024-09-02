"use client";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { consumerApi } from "../_api/consumer.api";
import { useListenConsumerUpdate } from "../_vm/event/useListenConsumerUpdate";

export const useConsumerQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    consumerApi.consumer.get.useQuery<Consumer>({ id });

  useListenConsumerUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    consumer: data ?? null,
  };
};

export const useInvalidateConsumer = () => {
  const invalidateConsumer = consumerApi.useUtils().consumer.get.invalidate;

  return (id: string) => invalidateConsumer({ id });
};
