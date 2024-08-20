"use client";
import { PostOffice } from "@/kernel/domain/post/post.type";
import { postApi } from "../_api/post.api";

export const usePostOfficeListBySettlementRefQuery = (
  settlementRef: string,
) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    postApi.post.getOfficeListBySettlementRef.useQuery<Array<PostOffice>>({
      settlementRef,
    });

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    postOfficeList: data || [],
  };
};

export const useInvalidatePostOfficeListBySettlement = () => {
  const invalidatePostOfficeList =
    postApi.useUtils().post.getOfficeListBySettlementRef.invalidate;

  return (settlementRef: string) => invalidatePostOfficeList({ settlementRef });
};
