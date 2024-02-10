import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListAction } from "../_action/getUserList.action";
import { getUserAction } from "../_action/getUser.action";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";
import { useListenUserUpdate } from "../_vm/event/useListenUserUpdate";
import { UserId } from "@/shared/lib/user";
const baseKey = "user";

export const getUserQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getUserById", userId],
  queryFn: () => getUserAction({ userId }),
});

export const useUserQuery = (userId: UserId) => {
  const query = getUserQuery(userId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenUserUpdate();

  return {
    isPending,
    isSuccess,
    data,
  };
};

export const getUserListQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getUserList"],
  queryFn: () => getUserListAction({ userId }),
});

export const useUserListQuery = (userId: UserId) => {
  const query = getUserListQuery(userId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenUserListUpdate();

  return {
    isPending,
    isSuccess,
    data: data ? data.userList : [],
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

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserList"],
    });
};
