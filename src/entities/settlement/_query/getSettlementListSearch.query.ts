"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { settlementApi } from "../_api/settlement.api";

const REFRESH_INTERVAL = 1000 * 60 * 60 * 3;

// export const getSettlementListSearchToSelectQuery = (q: string) =>
//   queryOptions({
//     queryKey: [baseQueryKey, QUERY_KEY, q],
//     queryFn: () => getSettlementListSearchToSelectAction({ q }),
//     gcTime: REFRESH_INTERVAL,
//   });

export const useSettlementListSearchToSelectQuery = (
  settlementDefault: string = "",
) => {
  const [q, setQ] = useState<string>("");

  useEffect(() => {
    if (!settlementDefault) return;
    setQ(settlementDefault);
  }, [settlementDefault]);

  // const invalidate = useInvalidateSettlementListSearchToSelect();

  // useEffect(() => {
  //   if (q) {
  //     invalidate(q);
  //   }
  // }, [invalidate, q]);

  const { isPending, isSuccess, isFetchedAfterMount, data } =
    settlementApi.settlement.search.useQuery({ q });

  return {
    toSearch: (q: string) => setQ(q),
    isPending,
    isSuccess,
    isFetchedAfterMount,
    settlementList: data ?? [],
  };
};

export const useInvalidateSettlementListSearchToSelect = () => {
  const invalidate = settlementApi.useUtils().settlement.search.invalidate;

  return (q: string) => invalidate({ q });
};
