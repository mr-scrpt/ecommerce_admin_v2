export const useDeliveryAddressCreateModel = () => {
  const { mutateAsync, isPending } = useDeliveryUpdateMutation();

  return {
    deliveryUpdate: mutateAsync,
    isPending,
  };
};
