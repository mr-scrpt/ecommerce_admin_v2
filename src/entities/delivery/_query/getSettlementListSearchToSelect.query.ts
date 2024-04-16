"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSettlementListSearchToSelectAction } from "../_action/getSettlementListSearchToSelect";
import { baseQueryKey } from "../_domain/delivery.types";
import { useListenDeliveryUpdate } from "../_vm/event/useListenDeliveryUpdate";

const QUERY_KEY = "settlementListSearchToSelect";
export const getSettlementListSearchToSelectQuery = (q: string) => ({
  queryKey: [baseQueryKey, QUERY_KEY, q],
  queryFn: () => getSettlementListSearchToSelectAction({ q }),
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

  useListenDeliveryUpdate();

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
