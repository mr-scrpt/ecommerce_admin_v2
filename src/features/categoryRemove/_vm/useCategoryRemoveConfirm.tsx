import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useCategoryRemoveMutation } from "../_mutation/categoryRemove.mutation";

export const useCategoryRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { categoryRemove, isPending, isSuccess } = useCategoryRemoveMutation();

  const removeCategoryConfirm = async (categoryId: string) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a category? This action cannot be canceled",
    });

    if (!confirmation) return;

    await categoryRemove({ selector: { id: categoryId } });
  };

  return { isPending, isSuccess, removeCategoryConfirm };
};
