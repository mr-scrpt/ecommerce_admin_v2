"use client";
import { useCallback, useEffect, useState } from "react";
import { settlementApi } from "../_api/settlement.api";

export const useSettlemenListSearchToSelectQuery = (
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
    settlementApi.settlement.search.useQuery({ q });

  return {
    toSearch,
    searchValue: q,
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
