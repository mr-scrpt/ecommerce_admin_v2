import { UserId, getUserListAction } from "@/entities/user/user";
import { buildDate } from "@/shared/lib/date";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const baseKey = "userTable";
export const useGetUserTableList = (userId: UserId) => {
  const { isPending, isSuccess, data } = useQuery({
    queryKey: [baseKey, "getUserTableList"],
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
    isSuccess,
    userList: userList ?? [],
  };
};

export const useInvalidateUserTableList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserTableList"],
    });
};
