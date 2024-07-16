"use client";
import { settlementApi } from "../_api/settlement.api";

export const useSettlementGetByRefQuery = (settlementRef: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    settlementApi.settlement.getByRef.useQuery({ settlementRef });

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    settlement: data,
  };
};

export const useInvalidateSettlementByRef = () => {
  const invalidate = settlementApi.useUtils().settlement.getByRef.invalidate;

  return (settlementRef: string) => invalidate({ settlementRef });
};
