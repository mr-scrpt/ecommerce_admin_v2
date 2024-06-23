"use client";
import { consumerDataApi } from "../_api/consumerData.api";
import { ConsumerData } from "../_domain/types";
import { useListenOrderOwnerUpdate } from "../_vm/event/useListenOrderOwnerUpdate";

export const useConsumerDataByOrderQuery = (orderId: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    consumerDataApi.consumerData.getByOrder.useQuery<ConsumerData>({ orderId });
  console.log("output_log:  =>>>", data);

  useListenOrderOwnerUpdate();

  return {
    isPending,
    isSuccess,
    data: data,
    isFetchedAfterMount,
  };
};

export const useInvalidateOrderOwner = () => {
  const invalidate =
    consumerDataApi.useUtils().consumerData.getByOrder.invalidate;

  return (orderId: string) => invalidate({ orderId });
};
