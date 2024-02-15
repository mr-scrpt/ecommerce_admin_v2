import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListAction } from "../_action/getUserList.action";
import { userBaseQueryKey } from "../_domain/user.types";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";

export const getUserListQuery = () => ({
  queryKey: [userBaseQueryKey, "getUserList"],
  queryFn: () => getUserListAction(),
});

export const useUserListQuery = () => {
  const query = getUserListQuery();
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
