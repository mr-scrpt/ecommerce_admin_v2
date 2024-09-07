"use client";
import { PostOffice } from "@/kernel/domain/post/post.type";
import { postApi } from "../_api/post.api";

export const usePostOfficeQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    postApi.post.getOffice.useQuery<PostOffice>({
      id,
    });

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    postOffice: data ?? null,
  };
};

export const useInvalidatePostOffice = () => {
  const invalidatePostOfficeList = postApi.useUtils().post.getOffice.invalidate;

  return (id: string) => invalidatePostOfficeList({ id });
};
