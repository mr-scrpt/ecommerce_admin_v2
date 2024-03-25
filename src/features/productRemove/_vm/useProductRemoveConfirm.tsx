import { ProductId } from "@/entities/product";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useProductRemoveMutation } from "../_mutation/productRemove.mutation";

export const useProductRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { productRemove, isPending, isSuccess } = useProductRemoveMutation();

  const removeProductConfirm = async (productId: ProductId) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a product? This action cannot be canceled",
    });

    if (!confirmation) return;

    await productRemove({ productId });
  };

  return { isPending, isSuccess, removeProductConfirm };
};
