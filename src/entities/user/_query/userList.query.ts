"use client";
import { userApi } from "../_api/user.api";
import { User } from "../_domain/user.types";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";

export const useUserListQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    userApi.user.getList.useQuery<Array<User>>();

  useListenUserListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data: data ? data : [],
  };
};

export const useInvalidateUserList = () => {
  const invalidateUserList = userApi.useUtils().user.getList.invalidate;

  return () => invalidateUserList();
};
