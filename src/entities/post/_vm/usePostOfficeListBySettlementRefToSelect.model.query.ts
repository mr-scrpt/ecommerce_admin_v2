"use client";
import { PostOfficeEntity } from "@/kernel/domain/post/post.type";
import { convertPostToLowerCase } from "../_domain/post.convertor";
import { PostOfficeToSelect } from "../_domain/post.type";
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

  const result = mapToSelect(convertedPostOfficeList);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    postListToSelect: result || [],
  };
};

const mapToSelect = (
  data: Array<PostOfficeEntity>,
): Array<PostOfficeToSelect> => {
  return data.map((postOffice) => {
    return {
      value: postOffice.ref,
      type: postOffice.categoryOfWarehouse,
      label: postOffice.description,
    };
  });
};
