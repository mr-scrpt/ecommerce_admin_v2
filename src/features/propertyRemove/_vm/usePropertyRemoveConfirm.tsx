import { PropertyId } from "@/entities/property";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { usePropertyRemoveMutation } from "../_mutation/propertyRemove.mutation";

export const usePropertyRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { propertyRemove, isPending, isSuccess } = usePropertyRemoveMutation();

  const removePropertyConfirm = async (propertyId: PropertyId) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a property? This action cannot be canceled",
    });

    if (!confirmation) return;

    await propertyRemove({ propertyId });
  };

  return { isPending, isSuccess, removePropertyConfirm };
};
