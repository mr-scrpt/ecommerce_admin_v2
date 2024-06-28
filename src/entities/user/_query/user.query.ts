"use client";
import { User } from "@/kernel/domain/user/user.type";
import { userApi } from "../_api/user.api";
import { useListenUserUpdate } from "../_vm/event/useListenUserUpdate";

export const useUserQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    userApi.user.get.useQuery<User>({ id });

  useListenUserUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    user: data,
  };
};

export const useInvalidateUser = () => {
  const invalidateUser = userApi.useUtils().user.get.invalidate;

  return (id: string) => invalidateUser({ id });
};
