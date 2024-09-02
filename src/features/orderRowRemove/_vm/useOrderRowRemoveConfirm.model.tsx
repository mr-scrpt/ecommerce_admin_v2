import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useOrderRowRowMutation } from "../_mutation/useOrderRowRemove.mutation";

export const useOrderRowRemoveConfirmModel = () => {
  const getConfirmation = useGetConfirmation();

  const { orderRowRemove, isPending, isSuccess } = useOrderRowRowMutation();

  const removeOrderConfirm = async (orderRowId: string) => {
    console.log("output_log: ORDER REMOVE =>>>", orderRowId);
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a order row? This action cannot be canceled",
    });

    if (!confirmation) return;

    await orderRowRemove({ selector: { id: orderRowId } });
  };

  return { isPending, isSuccess, removeOrderConfirm };
};
