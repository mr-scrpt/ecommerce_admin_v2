import { inputDebounce } from "@/shared/lib/debounce";
import { useAppearanceDelay } from "@/shared/lib/react";
import { useMemo } from "react";
import { useSettlemenListSearchToSelectQuery } from "../_query/getSettlementListSearch.query";
import { SettlementDefaultSelectOption } from "@/kernel/domain/settlement/form.schema";

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

  const settlementListToSelect = useMemo(
    () =>
      settlementList.map<SettlementDefaultSelectOption>((settlement) => ({
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
