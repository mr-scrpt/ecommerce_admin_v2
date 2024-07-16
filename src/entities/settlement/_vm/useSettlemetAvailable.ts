import { useAppearanceDelay } from "@/shared/lib/react";
import { useSettlementGetByRefQuery } from "../_query/getSettlementByRef.query";

export const useSettlementCourierAvailableByRefModel = (
  settlementRef: string,
) => {
  const { settlement, isPending, isSuccess, isFetchedAfterMount } =
    useSettlementGetByRefQuery(settlementRef);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    availableSettlementCourier: !!settlement?.radiusHomeDelivery,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  };
};
