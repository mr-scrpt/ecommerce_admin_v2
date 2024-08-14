import { useDeliveryUpdateMutation } from "../_mutation/useDeliveryUpdate.mutation";

export const useDeliveryAddressCreateModel = () => {
  const { mutateAsync, isPending } = useDeliveryUpdateMutation();

  return {
    deliveryUpdate: mutateAsync,
    isPending,
  };
};
