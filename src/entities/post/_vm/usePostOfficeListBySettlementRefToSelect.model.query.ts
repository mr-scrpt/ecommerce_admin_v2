"use client";
import { buildPostOfficeOptionsArray } from "@/kernel/domain/post/form.schema";
import { PostOfficeEntity } from "@/kernel/domain/post/post.type";
import { convertPostToLowerCase } from "../_domain/post.convertor";
import { usePostOfficeListBySettlementRefQuery } from "../_query/usePostOfficeListBySettlementRef.query";

export const usePostListBySettlementRefToSelectModel = (
  settlementId: string,
) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOfficeList } =
    usePostOfficeListBySettlementRefQuery(settlementId);

  const convertedPostOfficeList: Array<PostOfficeEntity> = [];

  for (const postOffice of postOfficeList) {
    convertedPostOfficeList.push(convertPostToLowerCase(postOffice));
  }

  const postListToSelect = buildPostOfficeOptionsArray(convertedPostOfficeList);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    postListToSelect,
  };
};
