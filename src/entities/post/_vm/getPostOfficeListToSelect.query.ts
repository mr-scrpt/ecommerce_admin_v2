"use client";
import { convertPostToLowerCase } from "../_domain/post.convertor";
import { PostOfficeEntity, PostOfficeToSelect } from "../_domain/post.type";
import { usePostOfficeListQuery } from "../_query/usePostOfficeList.query";

export const usePostOfficeListToSelectModel = (settlementId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOfficeList } =
    usePostOfficeListQuery(settlementId);

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
