import {
  UserId,
  getUserListAction,
  useUserListQuery,
} from "@/entities/user/user";
import { buildDate } from "@/shared/lib/date";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const baseKey = "userTable";

export const useGetUserTableList = (userId: UserId) => {
  // const { isPending, isSuccess, data } = useQuery({
  //   queryKey: [baseKey, "getUserTableList"],
  //   queryFn: () => getUserListAction({ userId }),
  // });
  const { isPending, isSuccess, data } = useUserListQuery(userId);

  const userList = data?.map((item) => ({
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

// export const useInvalidateUserTableListSocket = () => {
//   const queryClient = useQueryClient();
//
//   useSocketHandler(WSEventEnum.USER_REFRESH, () => {
//     queryClient.invalidateQueries({
//       queryKey: [baseKey, "getUserTableList"],
//     });
//   });
// };
