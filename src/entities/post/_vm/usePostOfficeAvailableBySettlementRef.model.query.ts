"use client";
import { usePostOfficeListBySettlementRefQuery } from "../_query/usePostOfficeListBySettlementRef.query";

export const usePostOfficeAvailableBySettlementRefModel = (
  settlementRef: string,
) => {
  console.log("output_log:  =>>> Request Available Post", settlementRef);

  const { isPending, isSuccess, isFetchedAfterMount, postOfficeList } =
    usePostOfficeListBySettlementRefQuery(settlementRef);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    isPostAvailable: !!postOfficeList.length,
  };
};
