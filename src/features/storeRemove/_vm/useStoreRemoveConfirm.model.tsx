import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useStoreRemoveMutation } from "../_mutation/storeRemove.mutation";

export const useStoreRemoveConfirmModel = () => {
  const getConfirmation = useGetConfirmation();

  const { storeRemove, isPending, isSuccess } = useStoreRemoveMutation();

  const removeStoreConfirm = async (storeId: string) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a store? This action cannot be canceled",
    });

    if (!confirmation) return;

    await storeRemove({ storeId });
  };

  return { isPending, isSuccess, removeStoreConfirm };
};
