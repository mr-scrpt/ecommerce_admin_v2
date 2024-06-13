"use client";
import { postApi } from "../_api/post.api";
import { PostOffice } from "../_domain/post.type";

type QueryParams = {
  settlementId: string;
};

export const usePostOfficeListBySettlementQuery = (query: QueryParams) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    postApi.post.getOfficeListBySettlement.useQuery<Array<PostOffice>>(query);

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

  return (query: QueryParams) => invalidatePostOfficeList(query);
};
