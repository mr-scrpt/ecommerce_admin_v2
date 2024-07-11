"use client";
import { addressCreateApi } from "../_api/addressCreate.api";
import { useEmitAddressCreate } from "../_vm/event/useEmitAddressCreate";

export const useAddressCreateMutation = () => {
  const { addressCreateEvent } = useEmitAddressCreate();
  const { isPending, isSuccess, mutateAsync } =
    addressCreateApi.addressCreate.create.useMutation({
      onSuccess: async ({ userId }) => {
        addressCreateEvent(userId);
      },
    });
  return {
    addressCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
