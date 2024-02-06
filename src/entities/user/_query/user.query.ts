import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListAction } from "../_action/getUserList.action";
import { UserId } from "../_domain/types";
import { getUserAction } from "../_action/getUser.action";

const baseKey = "user";

export const getUserQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getUserById", userId],
  queryFn: () => getUserAction({ userId }),
});

export const getUserListQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getUserById", userId],
  queryFn: () => getUserListAction({ userId }),
});

export const useUserListQuery = (userId: UserId) => {
  const { isPending, data } = useQuery({
    queryKey: [baseKey, "getUserById", userId],
    queryFn: () => getUserListAction({ userId }),
  });
  return {
    isPending,
    userList: data ? data?.userList : [],
  };
};

export const useInvalidateUser = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserById", userId],
    });
};

export const useInvalidateUserList = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserListQuery", userId],
    });
};
