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
  queryKey: [baseKey, "getUserList"],
  queryFn: () => getUserListAction({ userId }),
});

export const useUserListQuery = (userId: UserId) => {
  const { isPending, isSuccess, data } = useQuery({
    queryKey: [baseKey, "getUserList"],
    queryFn: () => getUserListAction({ userId }),
  });
  console.log("output_log: query data =>>>", data?.userList);
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
  console.log("output_log: useInvalidateUserList =>>>");
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserList"],
    });
};
