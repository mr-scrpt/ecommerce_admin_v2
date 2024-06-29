"use client";
import { storeCreateApi } from "../_api/storeCreate.api";
import { useEmitStoreCreate } from "../_vm/event/useEmitStoreCreate";

export const useStoreCreateMutation = () => {
  const { storeCreateEvent } = useEmitStoreCreate();
  const { isPending, isSuccess, mutateAsync } =
    storeCreateApi.storeCreate.create.useMutation({
      onSuccess: async () => {
        storeCreateEvent();
      },
    });
  return {
    storeCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
