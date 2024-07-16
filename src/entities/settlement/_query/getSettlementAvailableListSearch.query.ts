"use client";
import { useCallback, useEffect, useState } from "react";
import { settlementApi } from "../_api/settlement.api";

export const useSettlementAvailableListSearchToSelectQuery = (
  settlementDefault: string = "",
) => {
  const [q, setQ] = useState<string>("");

  const toSearch = useCallback(
    (q: string) => {
      setQ(q);
    },
    [setQ],
  );

  useEffect(() => {
    if (!settlementDefault) return;
    setQ(settlementDefault);
  }, [settlementDefault]);

  const { isPending, isSuccess, isFetchedAfterMount, data } =
    settlementApi.settlement.searchAvailable.useQuery({ q });

  return {
    toSearch,
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
