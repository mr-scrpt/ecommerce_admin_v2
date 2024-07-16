"use client";
import { usePostOfficeListBySettlementRefQuery } from "../_query/usePostOfficeListBySettlementRef.query";

export const usePostOfficeAvailableBySettlementRef = (
  settlementRef: string,
) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOfficeList } =
    usePostOfficeListBySettlementRefQuery(settlementRef);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    availablePost: !!postOfficeList.length,
  };
};
