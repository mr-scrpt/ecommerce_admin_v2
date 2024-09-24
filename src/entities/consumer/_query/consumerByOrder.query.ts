"use client";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { consumerApi } from "../_api/consumer.api";
import { useListenConsumerUpdate } from "../_vm/event/useListenConsumerUpdate";

export const useConsumerByOrderQuery = (orderId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    consumerApi.consumer.getByOrder.useQuery<Consumer>({ orderId });

  useListenConsumerUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    consumer: data ?? null,
  };
};

export const useInvalidateConsumerByOrder = () => {
  const invalidateConsumer =
    consumerApi.useUtils().consumer.getByOrder.invalidate;

  return (orderId: string) => invalidateConsumer({ orderId });
};
