import { useGetConfirmation } from "@/shared/lib/confirmation";
import { usePropertyRemoveMutation } from "../_mutation/propertyRemove.mutation";

export const usePropertyRemoveConfirmModel = () => {
  const getConfirmation = useGetConfirmation();

  const { propertyRemove, isPending, isSuccess } = usePropertyRemoveMutation();

  const removePropertyConfirm = async (propertyId: string) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a property? This action cannot be canceled",
    });

    if (!confirmation) return;

    await propertyRemove({ selector: { id: propertyId } });
  };

  return { isPending, isSuccess, removePropertyConfirm };
};
