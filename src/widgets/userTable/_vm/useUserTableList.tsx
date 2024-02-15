import { useUserListQuery } from "@/entities/user/user";
import { buildDate } from "@/shared/lib/date";

export const useUserTableList = () => {
  const { isPending, isSuccess, data } = useUserListQuery();

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
