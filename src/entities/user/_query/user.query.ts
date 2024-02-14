import { UserId } from "@/shared/lib/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserAction } from "../_action/getUser.action";
import { userBaseQueryKey } from "../_domain/user.types";
import { useListenUserUpdate } from "../_vm/event/useListenUserUpdate";

export const getUserQuery = (userId: UserId) => ({
  queryKey: [userBaseQueryKey, "getUserById", userId],
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

export const useInvalidateUser = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [userBaseQueryKey, "getUserById", userId],
    });
};
