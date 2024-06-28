"use client";
import { User } from "@/kernel/domain/user/user.type";
import { userApi } from "../_api/user.api";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";

export const useUserListQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    userApi.user.getList.useQuery<Array<User>>();

  useListenUserListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    userList: data ? data : [],
  };
};

export const useInvalidateUserList = () => {
  const invalidateUserList = userApi.useUtils().user.getList.invalidate;

  return () => invalidateUserList();
};
