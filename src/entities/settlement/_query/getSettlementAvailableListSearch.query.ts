"use client";
import { useEffect, useState } from "react";
import { settlementApi } from "../_api/settlement.api";

export const useSettlementAvailableListSearchToSelectQuery = (
  settlementDefault: string = "",
) => {
  const [q, setQ] = useState<string>("");

  useEffect(() => {
    if (!settlementDefault) return;
    setQ(settlementDefault);
  }, [settlementDefault]);

  const { isPending, isSuccess, isFetchedAfterMount, data } =
    settlementApi.settlement.searchAvailable.useQuery({ q });

  return {
    toSearch: (q: string) => setQ(q),
    isPending,
    isSuccess,
    isFetchedAfterMount,
    settlementList: data ?? [],
  };
};

export const useInvalidateSettlementAvailableListSearchToSelect = () => {
  const invalidate =
    settlementApi.useUtils().settlement.searchAvailable.invalidate;

  return (q: string) => invalidate({ q });
};
