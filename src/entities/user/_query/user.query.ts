import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListAction } from "../_action/getUserList.action";
import { UserId } from "../_domain/types";
import { buildDate } from "@/shared/lib/date";

const baseKey = "user";

export const getUserListQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getProfileById", userId],
  queryFn: () => getUserListAction({ userId }),
});

export const useUserList = (userId: UserId) => {
  const { isPending, data } = useQuery({
    queryKey: [baseKey, "getProfileById", userId],
    queryFn: () => getUserListAction({ userId }),
  });
  return {
    isPending,
    userList: data ? data?.userList : [],
  };
};

export const useUserTableList = (userId: UserId) => {
  const { isPending, data } = useQuery({
    queryKey: [baseKey, "getProfileById", userId],
    queryFn: () => getUserListAction({ userId }),
  });

  const userList = data?.userList.map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    userList: userList ?? [],
  };
};

export const useInvalidateUserList = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserListQuery", userId],
    });
};
