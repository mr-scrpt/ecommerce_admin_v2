"use client";
import { postApi } from "../_api/post.api";
import { PostOffice } from "../_domain/post.type";

export const usePostOfficeListBySettlementQuery = (settlementId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    postApi.post.getOfficeListBySettlement.useQuery<Array<PostOffice>>({
      settlementId,
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
    postApi.useUtils().post.getOfficeListBySettlement.invalidate;

  return (settlementId: string) => invalidatePostOfficeList({ settlementId });
};
