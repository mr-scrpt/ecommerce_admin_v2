import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useStaffRemoveMutation } from "../_mutation/staffUser.mutation";

export const useStaffRemoveConfirmModel = () => {
  const getConfirmation = useGetConfirmation();

  const { userRemove, isPending, isSuccess } = useStaffRemoveMutation();

  const removeStaffConfirm = async (userId: string) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a user? This action cannot be canceled",
    });

    if (!confirmation) return;

    await userRemove({ selector: { id: userId } });
  };

  return { isPending, isSuccess, removeStaffConfirm };
};
