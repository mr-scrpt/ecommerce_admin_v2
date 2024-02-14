import { UserId } from "@/shared/lib/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListAction } from "../_action/getUserList.action";
import { userBaseQueryKey } from "../_domain/user.types";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";

export const getUserListQuery = (userId: UserId) => ({
  queryKey: [userBaseQueryKey, "getUserList"],
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

export const useInvalidateUserList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [userBaseQueryKey, "getUserList"],
    });
};
