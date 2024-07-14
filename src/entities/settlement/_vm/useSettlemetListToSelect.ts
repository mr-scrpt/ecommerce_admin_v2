import { inputDebounce } from "@/shared/lib/debounce";
import { SettleToSelect } from "../_domain/ui.type";
import { useSettlementListSearchToSelectQuery } from "../_query/getSettlementListSearch.query";
import { useAppearanceDelay } from "@/shared/lib/react";

export const useSettlemetListToSelect = (settlementDefault: string = "") => {
  const {
    toSearch,
    settlementList,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  } = useSettlementListSearchToSelectQuery(settlementDefault);

  const settlementListToSelect = settlementList.map<SettleToSelect>(
    (settlement) => ({
      value: settlement.ref,
      area: settlement.areaDescription,
      region: settlement.regionsDescription,
      label: settlement.description,
    }),
  );

  const debouncedToSearch = inputDebounce((search) => toSearch?.(search));

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    toSearch: debouncedToSearch,
    settlementListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  };
};
