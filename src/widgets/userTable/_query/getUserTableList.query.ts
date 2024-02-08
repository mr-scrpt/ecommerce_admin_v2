import { UserId, getUserListAction } from "@/entities/user/user";
import { buildDate } from "@/shared/lib/date";
import { useSocketHandler } from "@/shared/lib/socket";
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
export const useInvalidateUserTableListSocket = () => {
  const queryClient = useQueryClient();

  // return () =>
  //   queryClient.invalidateQueries({
  //     queryKey: [baseKey, "getUserTableList"],
  //   });
  useSocketHandler("user-refresh", () => {
    console.log("output_log: emit user refresh =>>>");
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getUserTableList"],
    });
  });
};
