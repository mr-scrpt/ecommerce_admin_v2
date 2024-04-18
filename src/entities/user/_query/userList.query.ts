import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListAction } from "../_action/getUserList.action";
import { userBaseQueryKey } from "../_domain/user.types";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";

export const getUserListQuery = () =>
  queryOptions({
    queryKey: [userBaseQueryKey, "getUserList"],
    queryFn: () => getUserListAction(),
  });

export const useUserListQuery = () => {
  const query = getUserListQuery();
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenUserListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
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
