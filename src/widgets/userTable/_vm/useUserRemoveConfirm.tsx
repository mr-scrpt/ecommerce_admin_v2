import { UserId } from "@/entities/user/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useRemoveUserTableListMutation } from "../_mutation/removeUserTableList.mutation";

export const useUserRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { isPending, isSuccess, mutateAsync } =
    useRemoveUserTableListMutation();

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
