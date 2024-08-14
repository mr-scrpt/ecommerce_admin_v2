import { useAppearanceDelay } from "@/shared/lib/react";
import { useSettlementSearchByRefQuery } from "../_query/searchSettlementByRef.query";

export const useSettlementCourierAvailableByRefModel = (
  settlementRef?: string,
) => {
  const { settlement, isPending, isSuccess, isFetchedAfterMount } =
    useSettlementSearchByRefQuery(settlementRef || "");

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    isCourierAvailable: !!settlement?.radiusHomeDelivery,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  };
};
