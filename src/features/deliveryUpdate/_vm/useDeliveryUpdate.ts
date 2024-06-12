import { useDeliveryUpdateMutation } from "../_mutation/useDeliveryUpdate.mutation";

export const useDeliveryUpdate = () => {
  const { mutateAsync, isPending } = useDeliveryUpdateMutation();

  return {
    deliveryUpdate: mutateAsync,
    isPending,
  };
};
