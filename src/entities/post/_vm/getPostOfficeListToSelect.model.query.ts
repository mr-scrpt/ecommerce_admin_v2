"use client";
import { PostOfficeEntity } from "@/kernel/domain/post/post.type";
import { convertPostToLowerCase } from "../_domain/post.convertor";
import { PostOfficeToSelect } from "../_domain/post.type";
import { usePostOfficeListBySettlementQuery } from "../_query/usePostOfficeListBySettlement.query";

// type QueryParams = {
//   settlementId: string;
// };

export const usePostOfficeListToSelectModel = (settlementId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOfficeList } =
    usePostOfficeListBySettlementQuery(settlementId);

  const convertedPostOfficeList: Array<PostOfficeEntity> = [];

  for (const postOffice of postOfficeList) {
    convertedPostOfficeList.push(convertPostToLowerCase(postOffice));
  }

  const result = mapToSelect(convertedPostOfficeList);

  console.log("output_log:  result =>>>", result);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    postOfficeListToSelect: result || [],
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
