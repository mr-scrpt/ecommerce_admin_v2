import { useDeliveryUpdateMutation } from "../_mutation/useDeliveryUpdate.mutation";

export const useDeliveryAddressCreateModel = () => {
  const { deliveryUpdate, isPending, isSuccess } = useDeliveryUpdateMutation();

  return {
    deliveryUpdate,
    isPending,
    isSuccess,
  };
};
