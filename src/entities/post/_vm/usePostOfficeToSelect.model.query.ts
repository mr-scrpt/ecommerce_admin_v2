"use client";
import { buildPostOfficeOptionsArray } from "@/kernel/domain/post/form.schema";
import { PostOfficeEntity } from "@/kernel/domain/post/post.type";
import { convertPostToLowerCase } from "../_domain/post.convertor";
import { usePostOfficeQuery } from "../_query/usePostOffice.query";

export const usePostOfficeToSelectModel = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, postOffice } =
    usePostOfficeQuery(id);

  const convertedPostOfficeList: Array<PostOfficeEntity> = [];

  for (const item of [postOffice]) {
    if (!item) continue;
    convertedPostOfficeList.push(convertPostToLowerCase(item));
  }

  const postListToSelect = buildPostOfficeOptionsArray(convertedPostOfficeList);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    postListToSelect,
  };
};
