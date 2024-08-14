"use client";
import { settlementApi } from "../_api/settlement.api";

export const useSettlementSearchByRefQuery = (settlementRef: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    settlementApi.settlement.searchByRef.useQuery({ settlementRef });

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    settlement: data,
  };
};

export const useInvalidateSettlementByRef = () => {
  const invalidate = settlementApi.useUtils().settlement.searchByRef.invalidate;

  return (settlementRef: string) => invalidate({ settlementRef });
};
