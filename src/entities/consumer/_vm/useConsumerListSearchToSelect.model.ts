import { inputDebounce } from "@/shared/lib/debounce";
import { useAppearanceDelay } from "@/shared/lib/react";
import { useMemo } from "react";
import { useSettlemenListSearchToSelectQuery } from "../_query/getConsumerListSearch.query";
import { ConsumerDefaultSelectOption } from "@/kernel/domain/consumer/form.schema";

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

  const consumerListToSelect: Array<ConsumerDefaultSelectOption> = useMemo(
    () =>
      consumerList.map<ConsumerDefaultSelectOption>((consumer) => ({
        value: consumer.id,
        name: consumer.name,
        lastName: consumer.lastName,
        phone: consumer.phone,
        label: consumer.name,
      })),
    [consumerList],
  );

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
