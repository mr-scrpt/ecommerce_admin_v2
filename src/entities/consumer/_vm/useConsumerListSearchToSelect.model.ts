import { buildConsumerOptionsArray } from "@/kernel/domain/consumer/form.schema";
import { inputDebounce } from "@/shared/lib/debounce";
import { useAppearanceDelay } from "@/shared/lib/react";
import { useMemo } from "react";
import { useSettlemenListSearchToSelectQuery } from "../_query/getConsumerListSearch.query";

export const useConsumerListSearchToSelectModel = (
  consumerDefault: string = "",
) => {
  const {
    toSearch,
    searchValue,
    consumerList,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  } = useSettlemenListSearchToSelectQuery(consumerDefault);

  const consumerListToSelect = buildConsumerOptionsArray(consumerList);

  const debouncedToSearch = useMemo(
    () => inputDebounce((search) => toSearch?.(search)),
    [toSearch],
  );

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    toSearch: debouncedToSearch,
    searchValue,
    consumerListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  };
};
