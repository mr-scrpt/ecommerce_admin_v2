"use client";
import { useCallback, useEffect, useState } from "react";
import { consumerApi } from "../_api/consumer.api";

export const useSettlemenListSearchToSelectQuery = (
  consumerDefault: string = "",
) => {
  const [q, setQ] = useState<string>("");

  const toSearch = useCallback(
    (q: string) => {
      setQ(q);
    },
    [setQ],
  );

  useEffect(() => {
    if (!consumerDefault) return;
    setQ(consumerDefault);
  }, [consumerDefault]);

  const { isPending, isSuccess, isFetchedAfterMount, data } =
    consumerApi.consumer.search.useQuery({ q });

  return {
    toSearch,
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    consumerList: data ?? [],
  };
};

export const useInvalidateConsumerListSearchToSelect = () => {
  const invalidate = consumerApi.useUtils().consumer.search.invalidate;

  return (q: string) => invalidate({ q });
};
