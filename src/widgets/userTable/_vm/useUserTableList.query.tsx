import { useUserListQuery } from "@/entities/user/user";
import { buildDate } from "@/shared/lib/date";
import { UserId } from "@/shared/lib/user";

export const useGetUserTableList = (userId: UserId) => {
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
