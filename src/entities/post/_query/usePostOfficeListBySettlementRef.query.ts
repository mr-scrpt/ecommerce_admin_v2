"use client";
import { PostOffice } from "@/kernel/domain/post/post.type";
import { postApi } from "../_api/post.api";

export const usePostOfficeListBySettlementRefQuery = (
  settlementRef: string,
) => {
  console.log("output_log: Common Post Request =>>>", settlementRef);

  const { isPending, isSuccess, isFetchedAfterMount, data } =
    postApi.post.getOfficeListBySettlementRef.useQuery<Array<PostOffice>>({
      settlementRef,
    });
  console.log("output_log: Common Post DATA =>>>", data);

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
