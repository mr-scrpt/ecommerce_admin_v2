import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useConsumerRemoveMutation } from "../_mutation/removeUser.mutation";

export const useConsumerRemoveConfirmModel = () => {
  const getConfirmation = useGetConfirmation();

  const { userRemove, isPending, isSuccess } = useConsumerRemoveMutation();

  const removeConsumerConfirm = async (userId: string) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a user? This action cannot be canceled",
    });

    if (!confirmation) return;

    await userRemove({ selector: { id: userId } });
  };

  return { isPending, isSuccess, removeConsumerConfirm };
};
