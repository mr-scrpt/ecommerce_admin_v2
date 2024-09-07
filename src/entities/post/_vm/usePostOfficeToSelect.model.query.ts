"use client";
import { PostOfficeEntity } from "@/kernel/domain/post/post.type";
import { convertPostToLowerCase } from "../_domain/post.convertor";
import { PostOfficeToSelect } from "../_domain/post.type";
import { usePostOfficeQuery } from "../_query/usePostOffice.query";

export const usePostOfficeToSelectModel = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOffice } =
    usePostOfficeQuery(id);

  const convertedPostOfficeList: Array<PostOfficeEntity> = [];

  for (const item of [postOffice]) {
    if (!item) continue;
    convertedPostOfficeList.push(convertPostToLowerCase(item));
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
