import { Delivery } from "@/entities/delivery";
import { useOrderDeliveryUpdateMutation } from "../_mutation/useOrderDeliveryUpdate.mutation";
import { useAppSession } from "@/kernel/lib/nextauth";

export const useOrderDeliveryUpdate = () => {
  const { update: updateSession } = useAppSession();

  const onSuccess = async (delivery: Delivery) => {
    await updateSession({
      delivery,
    });
  };

  const { mutateAsync, isPending } = useOrderDeliveryUpdateMutation({
    onSuccess,
  });

  return {
    deliveryUpdate: mutateAsync,
    isPending,
  };
};
