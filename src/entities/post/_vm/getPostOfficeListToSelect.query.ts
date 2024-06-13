"use client";
import { convertPostToLowerCase } from "../_domain/post.convertor";
import { PostOfficeEntity, PostOfficeToSelect } from "../_domain/post.type";
import { usePostOfficeListBySettlementQuery } from "../_query/usePostOfficeListBySettlement.query";

type QueryParams = {
  settlementId: string;
};

export const usePostOfficeListToSelectModel = (query: QueryParams) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOfficeList } =
    usePostOfficeListBySettlementQuery(query);

  const convertedPostOfficeList: Array<PostOfficeEntity> = [];

  for (const postOffice of postOfficeList) {
    convertedPostOfficeList.push(convertPostToLowerCase(postOffice));
  }

  const result = mapToSelect(convertedPostOfficeList);

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
