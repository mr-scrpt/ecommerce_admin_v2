import { OptionId } from "@/entities/option";
import { useOptionRemove } from "@/features/optionRemove";
import { useGetConfirmation } from "@/shared/lib/confirmation";

export const useOptionRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { optionRemove, isPending, isSuccess } = useOptionRemove();

  const removeOptionConfirm = async (optionId: OptionId) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a option? This action cannot be canceled",
    });

    if (!confirmation) return;

    await optionRemove({ optionId });
  };

  return { isPending, isSuccess, removeOptionConfirm };
};
