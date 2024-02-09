import { UserId } from "@/entities/user/user";
import { useMutation } from "@tanstack/react-query";
import { useUserRemoveMutation } from "@/features/userRemove";
import { useInvalidateUserTableList } from "../_query/getUserTableList.query";

const baseKey = "userTable";

export const useUserRemoveTableListMutation = () => {
  const { mutateAsync: removeUserAsync } = useUserRemoveMutation();
  // const invaidateList = useInvalidateUserTableList();

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationKey: [baseKey, "removeUserTableList"],
    mutationFn: (userId: UserId) => removeUserAsync(userId),
    // onSuccess: invaidateList,
    // onSuccess: invaidateList,
  });

  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
