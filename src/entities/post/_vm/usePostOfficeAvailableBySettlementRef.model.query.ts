"use client";
import { usePostOfficeListBySettlementRefQuery } from "../_query/usePostOfficeListBySettlementRef.query";

export const usePostOfficeAvailableBySettlementRefModel = (
  settlementRef: string,
) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOfficeList } =
    usePostOfficeListBySettlementRefQuery(settlementRef);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    isPostAvailable: !!postOfficeList.length,
  };
};
