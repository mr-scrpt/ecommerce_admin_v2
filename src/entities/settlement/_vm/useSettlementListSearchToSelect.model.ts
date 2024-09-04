import { inputDebounce } from "@/shared/lib/debounce";
import { useAppearanceDelay } from "@/shared/lib/react";
import { useMemo } from "react";
import { SettleToSelect } from "../_domain/ui.type";
import { useSettlementAvailableListSearchToSelectQuery } from "../_query/getSettlementAvailableListSearch.query";

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
  } = useSettlementAvailableListSearchToSelectQuery(settlementDefault);

  const settlementListToSelect = useMemo(
    () =>
      settlementList.map<SettleToSelect>((settlement) => ({
        value: settlement.ref,
        area: settlement.areaDescription,
        region: settlement.regionsDescription,
        label: settlement.description,
      })),
    [settlementList],
  );

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