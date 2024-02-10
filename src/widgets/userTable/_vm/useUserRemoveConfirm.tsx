import { useUserRemove } from "@/features/userRemove/_vm/useUserRemove";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { UserId } from "@/shared/lib/user";

export const useUserRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { userRemove, isPending, isSuccess } = useUserRemove();

  const removeUserConfirm = async (userId: UserId) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a user? This action cannot be canceled",
    });

    if (!confirmation) return;

    await userRemove({ userId });
  };

  return { isPending, isSuccess, removeUserConfirm };
};
