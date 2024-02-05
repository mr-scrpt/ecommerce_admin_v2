import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListAction } from "../_action/getUserList.action";
import { UserId } from "../_domain/types";

const baseKey = "user";

export const getUserListQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getProfileById", userId],
  queryFn: () => getUserListAction({ userId }),
});

export const useUserListQuery = (userId: UserId) => {
  const { isPending, data } = useQuery({
    queryKey: [baseKey, "getProfileById", userId],
    queryFn: () => getUserListAction({ userId }),
  });
  return {
    isPending,
    userList: data ? data?.userList : [],
  };
};

export const useInvalidateUserList = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserListQuery", userId],
    });
};
