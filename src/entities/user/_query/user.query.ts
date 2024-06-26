import { UserId } from "@/shared/lib/user";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserAction } from "../_action/getUser.action";
import { userBaseQueryKey } from "../_domain/user.types";
import { useListenUserUpdate } from "../_vm/event/useListenUserUpdate";

export const getUserQuery = (userId: UserId) =>
  queryOptions({
    queryKey: [userBaseQueryKey, "getUser", userId],
    queryFn: () => getUserAction({ userId }),
  });

export const useUserQuery = (userId: UserId) => {
  const query = getUserQuery(userId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenUserUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data,
  };
};

export const useInvalidateUser = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [userBaseQueryKey, "getUser", userId],
    });
};
