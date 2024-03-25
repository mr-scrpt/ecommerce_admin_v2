import { CategoryId } from "@/entities/category";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useCategoryRemoveMutation } from "../_mutation/categoryRemove.mutation";

export const useCategoryRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { categoryRemove, isPending, isSuccess } = useCategoryRemoveMutation();

  const removeCategoryConfirm = async (categoryId: CategoryId) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a category? This action cannot be canceled",
    });

    if (!confirmation) return;

    await categoryRemove({ categoryId });
  };

  return { isPending, isSuccess, removeCategoryConfirm };
};
