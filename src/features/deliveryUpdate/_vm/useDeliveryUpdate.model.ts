import { useDeliveryUpdateMutation } from "../_mutation/useDeliveryUpdate.mutation";

export const useDeliveryUpdateModel = () => {
  const { mutateAsync, isPending } = useDeliveryUpdateMutation();

  return {
    deliveryUpdate: mutateAsync,
    isPending,
  };
};
