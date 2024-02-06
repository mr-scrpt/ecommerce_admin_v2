import { UserId } from "@/entities/user/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useRemoveUserTableList } from "../_query/removeUserTableList.query";

export const useRemoveUser = () => {
  const getConfirmation = useGetConfirmation();

  const { isPending, isSuccess, mutateAsync } = useRemoveUserTableList();

  const removeUser = async (userId: UserId) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a user? This action cannot be canceled",
    });

    if (!confirmation) return;

    await mutateAsync(userId);
  };

  return { isPending, isSuccess, removeUser };
};
