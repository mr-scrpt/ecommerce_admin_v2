import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useOrderRowRowMutation } from "../_mutation/useOrderRowRemove.mutation";

export const useOrderRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { orderRowRemove, isPending, isSuccess } = useOrderRowRowMutation();

  const removeOrderConfirm = async (orderRowId: string) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a order row? This action cannot be canceled",
    });

    if (!confirmation) return;

    await orderRowRemove({ orderRowId });
  };

  return { isPending, isSuccess, removeOrderConfirm };
};
