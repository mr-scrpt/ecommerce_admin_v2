"use client";
import { consumerApi } from "../_api/consumer.api";
import { ConsumerRelation } from "../_domain/consumer.type";
import { useListenConsumerUpdate } from "../_vm/event/useListenConsumerUpdate";

export const useConsumerRelationByOrderQuery = (orderId: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount, isError } =
    consumerApi.consumer.getRelationByOrder.useQuery<ConsumerRelation>({
      orderId,
    });

  // TODO: Figure out what updates should be watched
  useListenConsumerUpdate();

  return {
    isPending,
    isSuccess,
    data: data,
    isFetchedAfterMount,
    isError,
  };
};

export const useInvalidateConsumerRelationByOrder = () => {
  const invalidate =
    consumerApi.useUtils().consumer.getRelationByOrder.invalidate;

  return (orderId: string) => invalidate({ orderId });
};
