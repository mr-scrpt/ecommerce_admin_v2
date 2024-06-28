"use client";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { useEffect, useState } from "react";
import { consumerApi } from "../_api/consumer.api";
import { useListenConsumerUpdate } from "../_vm/event/useListenConsumerUpdate";

export const useConsumerListSearchQuery = () => {
  const [q, setQ] = useState<string>("");

  const invalidate = useInvalidateUserListSearch(q);

  useEffect(() => {
    if (q) {
      invalidate();
    }
  }, [q]);

  const { isPending, isFetchedAfterMount, isSuccess, data } =
    consumerApi.consumer.search.useQuery<Array<Consumer>>({ q });

  useListenConsumerUpdate();

  return {
    toSearch: (q: string) => setQ(q),
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    consumerList: data ?? [],
  };
};

export const useInvalidateUserListSearch = (q: string) => {
  const invalidateUserSearch =
    consumerApi.useUtils().consumer.search.invalidate;
  return () => invalidateUserSearch({ q });
};
