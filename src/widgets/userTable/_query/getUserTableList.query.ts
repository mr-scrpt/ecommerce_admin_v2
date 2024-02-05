import { UserId, getUserListAction } from "@/entities/user/user";
import { buildDate } from "@/shared/lib/date";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const baseKey = "userTable";
export const useUserTableList = (userId: UserId) => {
  const { isPending, data } = useQuery({
    queryKey: [baseKey, "getUserTableList", userId],
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

// export const useInvalidateUserTableList = () => {
//   const queryClient = useQueryClient();
//
//   return (userId: UserId) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseKey, "getUserTableList", userId],
//     });
// };
