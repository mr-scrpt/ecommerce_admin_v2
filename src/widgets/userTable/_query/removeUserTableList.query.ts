import { UserId } from "@/entities/user/user";
import { useUserRemoveQuery } from "@/features/userRemove";
import { useMutation } from "@tanstack/react-query";
import { useInvalidateUserTableList } from "./getUserTableList.query";

const baseKey = "userTable";

export const useRemoveUserTableList = () => {
  const { mutateAsync: removeUserAsync } = useUserRemoveQuery();
  const invaidateList = useInvalidateUserTableList();

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationKey: [baseKey, "removeUserTableList"],
    mutationFn: (userId: UserId) => removeUserAsync(userId),
    onSuccess: invaidateList,
  });

  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
