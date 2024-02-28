import { PropertyId } from "@/entities/property";
import { usePropertyRemoveMutation } from "@/features/propertyRemove";
import { useGetConfirmation } from "@/shared/lib/confirmation";

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
