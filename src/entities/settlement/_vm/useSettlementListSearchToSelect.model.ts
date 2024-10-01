import { buildSettlementOptionsArray } from "@/kernel/domain/settlement/form.schema";
import { inputDebounce } from "@/shared/lib/debounce";
import { useAppearanceDelay } from "@/shared/lib/react";
import { useMemo } from "react";
import { useSettlemenListSearchToSelectQuery } from "../_query/getSettlementListSearch.query";

export const useSettlementListSearchToSelectModel = (
  settlementDefault: string = "",
) => {
  const {
    toSearch,
    searchValue,
    settlementList,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  } = useSettlemenListSearchToSelectQuery(settlementDefault);

  const settlementListToSelect = buildSettlementOptionsArray(settlementList);

  const debouncedToSearch = useMemo(
    () => inputDebounce((search) => toSearch?.(search)),
    [toSearch],
  );

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    toSearch: debouncedToSearch,
    searchValue,
    settlementListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  };
};
