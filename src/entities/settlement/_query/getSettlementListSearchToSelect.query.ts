"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSettlementListSearchToSelectAction } from "../_action/getSettlementListSearchToSelect";
import { baseQueryKey } from "../_domain/settlement.type";

const QUERY_KEY = "settlementListSearchToSelect";
const REFRESH_INTERVAL = 1000 * 60 * 60 * 3;

export const getSettlementListSearchToSelectQuery = (q: string) =>
  queryOptions({
    queryKey: [baseQueryKey, QUERY_KEY, q],
    queryFn: () => getSettlementListSearchToSelectAction({ q }),
    gcTime: REFRESH_INTERVAL,
  });

export const useSettlementListSearchToSelectQuery = () => {
  const [q, setQ] = useState<string>("");
  const invalidate = useInvalidateSettlementListSearchToSelect();
  useEffect(() => {
    if (q) {
      invalidate(q);
    }
  }, [invalidate, q]);

  const query = getSettlementListSearchToSelectQuery(q);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  return {
    toSearch: (q: string) => setQ(q),
    isPending,
    isSuccess,
    isFetchedAfterMount,
    settlementListToSelect: data?.settlementListToSelect || [],
  };
};

export const useInvalidateSettlementListSearchToSelect = () => {
  const queryClient = useQueryClient();

  return (q: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, QUERY_KEY, q],
    });
};
