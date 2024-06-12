import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useProductRemoveMutation } from "../_mutation/productRemove.mutation";

export const useProductRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { productRemove, isPending, isSuccess } = useProductRemoveMutation();

  const removeProductConfirm = async (id: string) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a product? This action cannot be canceled",
    });

    if (!confirmation) return;

    await productRemove({ selector: { id } });
  };

  return { isPending, isSuccess, removeProductConfirm };
};
