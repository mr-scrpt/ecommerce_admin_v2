"use client";
import { userApi } from "../_api/user.api";
import { User } from "../_domain/user.types";
import { useListenUserUpdate } from "../_vm/event/useListenUserUpdate";

export const useUserQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    userApi.user.get.useQuery<User>({ id });

  useListenUserUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data,
  };
};

export const useInvalidateUser = () => {
  const invalidateUser = userApi.useUtils().user.get.invalidate;

  return () => invalidateUser();
};
