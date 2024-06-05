"use client";

import { cartRowCreateApi } from "../_api/cartRowCreate.api";
import { useEmitCartUpdate } from "../_vm/event/useEmitCartRowUpdate";

export const useCartRowCreateMutation = () => {
  const { cartUpdateEvent } = useEmitCartUpdate();

  const { mutateAsync, isPending } =
    cartRowCreateApi.cartRowCreate.create.useMutation({
      onSuccess: async ({ id }) => {
        cartUpdateEvent(id);
      },
    });
  return {
    cartRowCreate: mutateAsync,
    isPending,
  };
};
